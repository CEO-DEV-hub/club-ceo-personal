import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/genai";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // --- SECURITY MIDDLEWARE ---
  app.use(helmet()); // Apply basic security headers
  app.use(morgan("dev")); // Log HTTP requests

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
  app.use(express.json()); // Middleware to parse JSON bodies

  // Initialize Google AI client
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  // --- API ROUTES ---

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
  });

  // Secure endpoint for Gemini API
  app.post("/api/generate-text", async (req: Request, res: Response) => {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "API key not configured on server." });
    }

    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }
      if (prompt.length > 2000) {
        return res.status(400).json({ error: "Prompt is too long. Maximum 2000 characters." });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      
      res.json({ text });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      res.status(500).json({ error: "Failed to generate text from AI." });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
