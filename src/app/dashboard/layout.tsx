'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { useUser } from '@/firebase';
import { Loader2, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CommandPalette } from '@/components/dashboard/command-palette';
import { NotificationsPanel } from '@/components/dashboard/notifications-panel';
import Link from 'next/link';
import { DashboardProvider, useDashboard } from './dashboard-context';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useUser();
  const { profile, loading: profileLoading, isAdmin, isManager } = useDashboard();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Real-time Route Security Enforcement
  useEffect(() => {
    if (!profileLoading && profile && isMounted) {
      const adminOnlyPaths = ['/dashboard/settings', '/dashboard/automations'];
      const managerPlusPaths = ['/dashboard/analytics'];

      if (adminOnlyPaths.some(r => pathname.startsWith(r)) && !isAdmin) {
        router.push('/dashboard');
      }
      if (managerPlusPaths.some(r => pathname.startsWith(r)) && !isAdmin && !isManager) {
        router.push('/dashboard');
      }
    }
  }, [profile, profileLoading, pathname, router, isAdmin, isManager, isMounted]);

  if (authLoading || profileLoading || !isMounted) {
    return (
      <div className="min-h-screen bg-[#020203] flex flex-col items-center justify-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 noise z-0" />
        <Loader2 className="w-12 h-12 text-zinc-800 animate-spin relative z-10" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 animate-pulse relative z-10">Initializing Neural Link</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-50 relative overflow-hidden w-full selection:bg-white/10">
      <div className="fixed inset-0 bg-[#09090b] z-0" />
      
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed inset-y-0 left-0 z-[70] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <DashboardSidebar user={user} profile={profile} />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-6 right-6 lg:hidden text-zinc-400 hover:bg-white/5 rounded-full"
        >
          <X size={20} />
        </Button>
      </div>
      
      <main className="flex-1 h-screen overflow-y-auto relative z-10 flex flex-col w-full scrollbar-hide">
        <header className="h-16 border-b border-white/5 bg-zinc-950/40 backdrop-blur-2xl sticky top-0 z-50 shrink-0 w-full">
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="lg:hidden flex items-center gap-3">
                <Zap className="text-white fill-white" size={18} />
              </div>
              <div className="hidden lg:block w-full max-w-md">
                <CommandPalette />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/status" className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">Operational</span>
              </Link>
              <div className="h-4 w-px bg-white/10 mx-2 hidden sm:block" />
              <NotificationsPanel />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden bg-white/5 rounded-xl h-10 w-10 ml-2"
              >
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </header>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10 flex-1 flex flex-col overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}