
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type MockUser = {
  email: string;
  role: 'admin' | 'business';
  displayName: string;
} | null;

export function useLocalAuth() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('replyrush_mock_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: 'admin' | 'business') => {
    const newUser: MockUser = {
      email,
      role,
      displayName: role === 'admin' ? 'Chief Admin' : 'Brand Manager'
    };
    localStorage.setItem('replyrush_mock_user', JSON.stringify(newUser));
    setUser(newUser);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('replyrush_mock_user');
    setUser(null);
    router.push('/login');
  };

  return { user, loading, login, logout };
}
