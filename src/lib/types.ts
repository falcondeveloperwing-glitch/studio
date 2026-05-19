/**
 * @fileOverview Core type definitions for ReplyRush AI entities.
 * Ensures strict typing across the Firestore data layer and component tree.
 */

export interface UserProfile {
  id?: string;
  uid?: string;
  email: string | null;
  brandName: string;
  personality: 'Professional' | 'Friendly' | 'Luxury';
  status: 'free' | 'pro' | 'elite';
  role: 'admin' | 'manager' | 'agent' | 'viewer';
  createdAt: string;
  photoURL?: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerUsername: string;
  lastMessage: string;
  status: 'AI Handled' | 'Manual' | 'Escalated';
  unread: boolean;
  updatedAt: any; // Firestore serverTimestamp
  avatarSeed?: string;
  assignedTo?: string;
}

export interface Message {
  id?: string;
  role: 'customer' | 'ai' | 'business';
  content: string;
  type: 'text' | 'automated';
  timestamp: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
  runs: number;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  actionType: string;
  description: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert';
  unread: boolean;
  timestamp: string;
}
