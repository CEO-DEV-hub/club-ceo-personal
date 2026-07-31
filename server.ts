import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // --- SECURITY MIDDLEWARE ---
  app.use(helmet()); // Apply basic security headers
  
  // Conditional logging format
  const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
  app.use(morgan(logFormat));

  // CORS Configuration
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://club-ceo-personal.netlify.app'] // Replace with actual production URL if different
      : 'http://localhost:5173', // Vite dev server default
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

  // Rate limiting for API routes
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  });
  app.use("/api/", apiLimiter);

  // --- CORE MIDDLEWARE ---
  // Add body size limit
  app.use(express.json({ limit: '10kb' })); 

  // Initialize Google AI client with guard
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey && process.env.NODE_ENV === 'production') {
     console.error("CRITICAL: GEMINI_API_KEY is not set in production.");
     process.exit(1);
  }
  const genAI = new GoogleGenAI({ apiKey: geminiApiKey || "DUMMY_KEY_FOR_DEV" });

  // --- API ROUTES ---

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    // Redact NODE_ENV to prevent info leakage
    res.json({ status: "ok" });
  });

  // Secure endpoint for Gemini API
  app.post("/api/generate-text", async (req: Request, res: Response) => {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Service configuration error." }); // Redact exact error
    }

    try {
      const { prompt } = req.body;
      
      // Input Validation & Sanitization
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: "Invalid prompt format." });
      }
      if (prompt.length > 2000) {
        return res.status(400).json({ error: "Prompt is too long. Maximum 2000 characters." });
      }
      
      // Basic sanitization: strip non-printable characters (except common whitespace)
      const sanitizedPrompt = prompt.replace(/[^\x20-\x7E\n\r\t]/g, '');

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: sanitizedPrompt
      });
      
      res.json({ text: response.text });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Redact error details from client
      res.status(500).json({ error: "Failed to process request." });
    }
  });

  // --- VITE & STATIC ASSETS ---

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting production server...");
    // Serve static files from the dist directory in production
    app.use(express.static(path.join(__dirname, "dist")));
    
    // Handle SPA routing - redirect all requests to index.html
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  // Fix server binding: bind to 127.0.0.1 in dev, 0.0.0.0 in prod
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
  app.listen(PORT, host, () => {
    console.log(`Server running on http://${host}:${PORT}`);
  });
}

startServer();
