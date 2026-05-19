# Architecture Overview | ReplyRush AI

This document provides a technical deep-dive into the design patterns and infrastructure of the ReplyRush AI platform.

## 1. Frontend Architecture
- **Next.js 15 App Router**: Utilized for high-performance server-side rendering (SSR) of public pages and client-side interactivity within the dashboard.
- **Context-Driven State**: 
  - `FirebaseProvider`: Manages service instances (Auth, Firestore).
  - `DashboardContext`: Provides a unified, single-listener profile state to all dashboard components.
  - `DemoContext`: Manages the isolated simulation layer.

## 2. Persistence Model (Firestore)
The application uses a **User-Centric Hierarchical Path** structure to ensure multi-tenant isolation:
- `/users/{userId}`: Root profile data.
- `/users/{userId}/conversations/{convId}`: Thread metadata.
- `/users/{userId}/conversations/{convId}/messages/{msgId}`: Real-time message history.
- `/users/{userId}/auditLogs/{logId}`: Persistent mutation records.

## 3. Real-time Synchronization
- **Optimistic UI**: Firestore's `onSnapshot` combined with standard write functions ensures sub-second feedback for operators.
- **Resource Management**: All dashboard collections are constrained by `limit()` and ordered by `timestamp` to prevent browser memory overflows.

## 4. Security Enforcement
- **Role-Based Access Control (RBAC)**: Enforced via `DashboardLayout.tsx` which redirects unauthorized users before component mounting.
- **Write Verification**: Role checks are implemented at the UI level for all `updateDoc` and `setDoc` operations.

## 5. Offline Presentation Layer
The **Cinematic Demo Mode** is an architectural fallback. It intercepts standard Firebase hooks (`useCollection`, `useDoc`) and returns deterministic mock data from `src/lib/mock-data.ts` if the system detects an unstable configuration.
