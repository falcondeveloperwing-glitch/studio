
'use client';

import { useEffect, useState, useRef } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { useDemo } from '@/components/demo/demo-context';

export function useDoc<T = DocumentData>(ref: DocumentReference<T> | null) {
  const { isDemoMode, demoUser } = useDemo();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const docRef = useRef(ref);
  useEffect(() => {
    docRef.current = ref;
  }, [ref]);

  useEffect(() => {
    if (isDemoMode) {
      if (demoUser && ref?.path?.includes(demoUser.uid)) {
        setData({
          brandName: 'Demo Brand',
          personality: 'Professional',
          status: 'elite',
          role: demoUser.role,
          email: demoUser.email,
          ...demoUser
        } as T);
      }
      setLoading(false);
      return;
    }

    if (!docRef.current) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      docRef.current,
      (snapshot: DocumentSnapshot<T>) => {
        setData(snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore Document Error:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref, isDemoMode, demoUser]);

  return { data, loading, error };
}
