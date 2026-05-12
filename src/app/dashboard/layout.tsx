'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { useLocalAuth } from '@/hooks/use-local-auth';
import { Loader2, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
        {/* Responsive Header Fix */}
        <div className="lg:hidden h-20 px-6 flex items-center justify-between border-b border-white/5 bg-zinc-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-2xl">
              <Zap className="text-white fill-white" size={18} />
            </div>
            <span className="font-headline font-bold text-lg tracking-tight uppercase">Reply<span className="text-zinc-500">Rush</span></span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(true)}
            className="bg-white/5 rounded-xl h-10 w-10"
          >
            <Menu size={20} />
          </Button>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 lg:py-12 flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
