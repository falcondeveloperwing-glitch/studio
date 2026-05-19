# Deployment Guide | ReplyRush AI

ReplyRush AI is optimized for deployment on **Vercel** with a **Firebase** backend.

## 1. Firebase Preparation
1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. **Authentication**: Enable Email/Password and Google providers.
3. **Firestore**: 
   - Initialize in **Production Mode**.
   - Create a root collection named `users`.
4. **Project Settings**: Register a Web App and copy the `firebaseConfig` object.

## 2. Environment Configuration
Add the Following keys to your Vercel/Hosting provider:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 3. Deployment Steps (Vercel)
1. Link your GitHub repository to Vercel.
2. Select the **Next.js** framework preset.
3. Paste the Environment Variables.
4. Deploy.

## 4. Meta Webhook Verification (Optional)
To use the live Instagram listener:
1. Set `INSTAGRAM_VERIFY_TOKEN` in your environment.
2. Provide your Vercel deployment URL (`/api/webhooks/instagram`) to the Meta Developer Portal.
3. Respond to the hub challenge sent by Meta.
