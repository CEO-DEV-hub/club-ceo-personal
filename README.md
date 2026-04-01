# Club CEO - Premium Nightlife Reservation System

**Live Demo:** [https://club-ceo-personal.vercel.app](https://club-ceo-personal.vercel.app)

## 🌟 Overview
Club CEO is a modern website designed for a premium club in Hij, Delta State. It provides a seamless user experience for customers to browse luxury drinks and soup menu, calculate order totals, and secure table reservations with integrated payment processing.

## 🚀 Features
* **Dynamic Reservation Engine:** Automated calculation of complex orders (e.g., Hennessy, Azul, coke) with real-time total updates.
* **Secure Payment Integration:** Integrated with **Paystack API** to handle high-value transactions securely.
* **Real-time Database:** Powered by **Firebase Firestore** for instant order synchronization.
* **Responsive Design:** Optimized for mobile and desktop, catering to the "premium nightlife" aesthetic.
* **Security-First Architecture:** Implemented custom Firestore security rules and environment variable protection for API keys.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, Typescript 
* **Backend/BaaS:** Firebase (Firestore)
* **Deployment:** Vercel (CI/CD via GitHub)
* **Payments:** Paystack API

## 🔒 Security Implementation
To ensure data integrity, the project uses a "Write-Only" security model for the public:
- Users can create reservations but cannot read, update, or delete existing entries.
- All sensitive API keys are managed through Vercel Environment Variables, ensuring no secrets are exposed in the client-side code.

## 📂 Project Structure
- `/src`: Contains the React components and logic.
- `/public`: Static assets including high-quality luxury brand imagery.
- `firebase.js`: Configuration and initialization of the Firebase SDK.

---
*Developed as a personal project by Okafor Emmanuel Chukwuemeka.*
