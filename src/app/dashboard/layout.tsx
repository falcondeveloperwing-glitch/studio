'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { useLocalAuth } from '@/hooks/use-local-auth';
import { Loader2, Menu, X } from 'lucide-react';
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
    // Local route protection
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020203] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground animate-pulse">Initializing Neural Fleet</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#020203] relative overflow-hidden text-foreground">
      {/* Cinematic Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-50 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 noise z-0" />
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-[70] transition-transform duration-500 transform lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <DashboardSidebar />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-6 right-6 lg:hidden text-white hover:bg-white/10 rounded-full"
        >
          <X size={24} />
        </Button>
      </div>
      
      <main className="flex-1 h-screen overflow-y-auto relative z-10 custom-scrollbar scroll-smooth flex flex-col">
        {/* Mobile Top Nav */}
        <div className="lg:hidden p-6 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary">
              <span className="text-white font-black text-xs">R</span>
            </div>
            <span className="font-headline font-bold text-lg text-white">ReplyRush</span>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsSidebarOpen(true)}
            className="border-white/10 bg-white/5 rounded-xl"
          >
            <Menu size={20} className="text-white" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="dashboard-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="max-w-[1600px] mx-auto w-full pb-24"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
