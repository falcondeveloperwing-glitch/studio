# ReplyRush AI | Enterprise Conversation Infrastructure

ReplyRush AI is a high-performance SaaS platform designed to automate Instagram DM sales and customer engagement. Built with a "Trust-First" architecture, it provides businesses with the tools to capture leads, provide instant support, and recover lost revenue using advanced GenAI logic.

## 🚀 Vision
In the modern commerce landscape, speed is the ultimate competitive advantage. ReplyRush AI bridges the gap between customer inquiry and checkout by deploying intelligent "AI Sales Agents" directly into the DM inbox.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Backend/Auth**: Firebase (Auth, Firestore)
- **AI Engine**: Genkit (Google Gemini 2.5 Flash)
- **Motion**: Framer Motion
- **Icons**: Lucide React

## 💎 Key Features
- **Intelligent Inbox**: Real-time Firestore-backed DM ecosystem with automated pagination.
- **Automation Engine**: Deployable "Triggers & Actions" for sales and support logic.
- **Knowledge Base Training**: Train AI nodes on product catalogs, shipping policies, and FAQs.
- **Enterprise RBAC**: Real Role-Based Access Control (Admin, Manager, Agent, Viewer).
- **Operational Audit Logs**: Persistent, non-repudiable logs of all workspace activity.
- **Grounded Analytics**: Real-time data aggregation from workspace activity collections.
- **Cinematic Demo Mode**: Built-in guided walkthrough system for high-conversion demos.

## 📁 Project Structure
- `src/app`: Next.js 15 application routes and layouts.
- `src/ai`: Genkit flows and prompt definitions.
- `src/firebase`: Core Firebase configuration, providers, and specialized hooks.
- `src/components`: Atomic UI components and dashboard modules.
- `src/lib`: Shared utilities, activity loggers, and service schemas.

## ⚙️ Setup & Deployment

### 1. Environment Variables
Copy `.env.example` to `.env` and provide your credentials:
```bash
cp .env.example .env
```

### 2. Firebase Configuration
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Google & Email/Password).
3. Enable **Cloud Firestore**.
4. Register a Web App and add your config to `src/firebase/config.ts`.

### 3. Installation & Development
```bash
npm install
npm run dev
```

## 🛡 Security & Reliability
- **Workspace Isolation**: Data is partitioned by User UID at the Firestore level.
- **Route Guards**: Next.js layout-level auth validation for protected routes.
- **Audit Logs**: Every mutation is logged with actor identity and timestamp.

---
© 2025 ReplyRush AI. All rights reserved.