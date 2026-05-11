'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_USERS, type MockUser } from '@/lib/mock-users';

const AUTH_STORAGE_KEY = 'replyrush_auth_session';

export function useLocalAuth() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<MockUser, 'password'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...sessionUser } = foundUser;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      router.push('/dashboard');
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    router.push('/login');
  };

  return { user, loading, login, logout };
}
