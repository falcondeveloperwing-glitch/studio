
import { collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';

export type ActivityAction = 
  | 'WORKFLOW_CREATED' 
  | 'WORKFLOW_TOGGLED' 
  | 'PROFILE_UPDATED' 
  | 'MESSAGE_SENT' 
  | 'TEAM_MEMBER_INVITED'
  | 'SYSTEM_SYNC';

interface ActivityLogInput {
  db: Firestore;
  userId: string;
  actorName: string;
  actorRole: string;
  actionType: ActivityAction;
  description: string;
}

/**
 * Persists an operational audit log and a corresponding notification to Firestore.
 */
export async function logActivity({ 
  db, 
  userId, 
  actorName, 
  actorRole, 
  actionType, 
  description 
}: ActivityLogInput) {
  try {
    const timestamp = new Date().toISOString();

    // 1. Persist Audit Log
    await addDoc(collection(db, 'users', userId, 'auditLogs'), {
      actorId: userId,
      actorName,
      actorRole,
      actionType,
      description,
      timestamp
    });

    // 2. Persist Notification (Optional: logic could trigger for specific actions)
    if (['WORKFLOW_CREATED', 'TEAM_MEMBER_INVITED'].includes(actionType)) {
      await addDoc(collection(db, 'users', userId, 'notifications'), {
        title: actionType.replace('_', ' '),
        message: description,
        type: 'info',
        unread: true,
        timestamp
      });
    }
  } catch (err) {
    console.error('Failed to persist audit log:', err);
  }
}
