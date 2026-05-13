'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { useLocalAuth } from '@/hooks/use-local-auth';
import { Loader2, Menu, X, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CommandPalette } from '@/components/dashboard/command-palette';
import { NotificationsPanel } from '@/components/dashboard/notifications-panel';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useLocalAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020203] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 text-zinc-500 animate-spin" />
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600 animate-pulse">Loading Workspace</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-50 relative overflow-hidden">
      <div className="fixed inset-0 bg-[#09090b] z-0" />
      
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed inset-y-0 left-0 z-[70] transition-transform duration-300 transform lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <DashboardSidebar />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-6 right-6 lg:hidden text-zinc-400 hover:bg-white/5 rounded-full"
        >
          <X size={20} />
        </Button>
      </div>
      
      <main className="flex-1 h-screen overflow-y-auto relative z-10 flex flex-col custom-scrollbar">
        {/* Global Dashboard Header */}
        <header className="h-16 px-6 lg:px-10 flex items-center justify-between border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-8 flex-1">
            <div className="lg:hidden flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center">
                <Zap className="text-white fill-white" size={16} />
              </div>
            </div>
            
            <div className="hidden lg:block w-full max-w-md">
              <CommandPalette />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/status" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors group">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">All Systems Operational</span>
            </Link>
            
            <div className="h-4 w-px bg-white/10 mx-2 hidden sm:block" />
            
            <NotificationsPanel />
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden bg-white/5 rounded-lg h-9 w-9 ml-2"
            >
              <Menu size={18} />
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 lg:py-12 flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
