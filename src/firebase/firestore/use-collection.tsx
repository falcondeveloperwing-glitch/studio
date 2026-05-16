'use client';

import { useEffect, useState } from 'react';
import {
  Query,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { useDemo } from '@/components/demo/demo-context';
import { MOCK_CHATS, MOCK_WORKFLOWS, MOCK_LIVE_FEED } from '@/lib/mock-data';

export function useCollection<T = DocumentData>(query: Query<T> | null) {
  const { isDemoMode } = useDemo();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (isDemoMode) {
      // Deterministic demo data fallback
      let mockData: any[] = [];
      const queryPath = (query as any)?._query?.path?.segments?.join('/') || '';

      if (queryPath.includes('conversations')) mockData = MOCK_CHATS;
      else if (queryPath.includes('automations')) mockData = MOCK_WORKFLOWS;
      else if (queryPath.includes('auditLogs')) mockData = MOCK_LIVE_FEED;
      else if (queryPath.includes('notifications')) mockData = MOCK_LIVE_FEED.map(f => ({ ...f, unread: true, timestamp: new Date().toISOString() }));

      setData(mockData as T[]);
      setLoading(false);
      return;
    }

    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<T>) => {
        const items = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(items);
        setLoading(false);
      },
      async (serverError: FirestoreError) => {
        const permissionError = new FirestorePermissionError({
          path: 'Collection Query',
          operation: 'list',
        } satisfies SecurityRuleContext);

        setError(serverError);
        setLoading(false);
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [query, isDemoMode]);

  return { data, loading, error };
}
