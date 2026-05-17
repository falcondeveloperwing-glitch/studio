
'use client';

import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../provider';
import { useDemo } from '@/components/demo/demo-context';

export function useUser() {
  const auth = useAuth();
  const { isDemoMode, demoUser } = useDemo();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode && demoUser) {
      setUser(demoUser);
      setLoading(false);
      return;
    }

    if (isDemoMode && !demoUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, [auth, isDemoMode, demoUser]);

  return { user, loading };
}
