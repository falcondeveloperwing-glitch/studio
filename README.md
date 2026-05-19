# ReplyRush AI | Enterprise Conversation Infrastructure

ReplyRush AI is a high-performance SaaS platform built for high-volume Instagram DM sales and customer engagement. Designed as a "Commerce Operating System," it bridges the gap between customer inquiry and revenue through grounded AI logic and real-time collaboration tools.

## 🚀 Product Vision
In modern commerce, speed is the ultimate differentiator. ReplyRush AI enables brands to capture every DM opportunity by deploying intelligent "AI Sales Agents" directly into the Instagram inbox.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI + Framer Motion
- **Backend/Auth**: Firebase (Authentication, Cloud Firestore)
- **AI Engine**: Genkit (Google Gemini 2.5 Flash)
- **Deployment**: Vercel / Firebase App Hosting

## 💎 Core Features
- **Intelligent Inbox**: Real-time Firestore-backed DM ecosystem with operator assignment and sentiment tagging.
- **Automation Logic**: Visual CRUD for trigger-action pairs designed for sales and support.
- **Business Knowledge Base**: Training node for ingesting product catalogs, policies, and FAQs.
- **Enterprise RBAC**: Native Role-Based Access Control (Admin, Manager, Agent, Viewer).
- **Audit Logging**: Non-repudiable logs of all workspace mutations for compliance and accountability.
- **Grounded Analytics**: Real-time performance metrics derived from actual Firestore collection scope.
- **Cinematic Demo Mode**: A fully isolated, human-like guided walkthrough environment for sales presentations.

## 📁 Project Structure
- `src/app`: Next.js App Router filesystem routing.
- `src/ai`: Genkit flows for suggested replies and knowledge training.
- `src/firebase`: Core initialization and custom hooks (`useCollection`, `useDoc`).
- `src/components`: Atomic UI components, dashboard modules, and demo overlays.
- `docs/`: Technical due-diligence and deployment manuals.

## 🏗 Setup & Deployment

### 1. Environment Variables
Copy `.env.example` and provide your Firebase credentials:
```bash
cp .env.example .env
```

### 2. Firebase Configuration
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Google & Email/Password).
3. Enable **Cloud Firestore**.
4. Configure standard security rules for UID isolation.

### 3. Installation
```bash
npm install
npm run dev # Runs on port 9002
```

## 🛡 Security & Reliability
- **Data Isolation**: Multi-tenant partitioning at the Firestore level via User UID paths.
- **Route Guards**: Layout-level role enforcement preventing privilege escalation.
- **Failsafe**: Automatic fallback to "Demo Mode" when Firebase configuration is missing or unstable.

## 🗺 Roadmap
- **Phase 1**: Full Meta Webhook handshake completion.
- **Phase 2**: Background worker implementation for autonomous responses.
- **Phase 3**: Thread virtualization for ultra-high volume inbox performance.

---
© 2025 ReplyRush AI. All rights reserved.