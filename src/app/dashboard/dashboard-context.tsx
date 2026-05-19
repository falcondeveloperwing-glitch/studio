'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface DashboardContextType {
  profile: any;
  loading: boolean;
  isAdmin: boolean;
  isManager: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const db = useFirestore();

  // Unified single listener for the entire dashboard session
  const userRef = useMemoFirebase(() => (user ? doc(db, 'users', user.uid) : null), [user, db]);
  const { data: profile, loading: profileLoading } = useDoc(userRef);

  const isAdmin = profile?.role === 'admin';
  const isManager = profile?.role === 'manager';

  const value = useMemo(() => ({
    profile,
    loading: profileLoading,
    isAdmin,
    isManager
  }), [profile, profileLoading, isAdmin, isManager]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within a DashboardProvider');
  return context;
}
