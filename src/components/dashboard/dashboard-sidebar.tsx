
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Inbox, 
  BrainCircuit, 
  Zap, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles,
  Command,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalAuth } from '@/hooks/use-local-auth';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Inbox', icon: Inbox, href: '/dashboard/inbox' },
  { label: 'AI Knowledge', icon: BrainCircuit, href: '/dashboard/knowledge' },
  { label: 'Automations', icon: Zap, href: '/dashboard/automations' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useLocalAuth();

  return (
    <div className="w-[320px] h-screen border-r border-white/[0.06] flex flex-col bg-[#020203]/80 backdrop-blur-3xl sticky top-0 z-50">
      <div className="p-10">
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-[1.25rem] bg-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-700">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <div>
            <span className="font-headline font-bold text-2xl tracking-tighter text-white">ReplyRush</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Neural v4.2</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-6 py-6 space-y-12">
        <div>
          <p className="px-5 text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.4em] mb-6">Management</p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className={cn(
                      "flex items-center justify-between px-5 py-4 rounded-[1.5rem] transition-all duration-500 group relative",
                      isActive 
                        ? "bg-white/[0.06] text-white shadow-xl" 
                        : "text-muted-foreground/70 hover:bg-white/[0.03] hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className={cn(
                        "transition-all duration-500",
                        isActive ? "text-primary scale-110" : "group-hover:text-white"
                      )} />
                      <span className="font-bold text-base tracking-tight">{item.label}</span>
                    </div>
                    {isActive ? (
                      <ChevronRight size={14} className="text-primary" />
                    ) : (
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full glow-primary" />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-5">
          <Button variant="outline" className="w-full h-14 border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.08] rounded-[1.5rem] flex items-center justify-between px-6 group border-dashed transition-all duration-500">
            <div className="flex items-center gap-3">
              <Command size={18} className="text-muted-foreground" />
              <span className="text-xs font-bold text-white/80">Command</span>
            </div>
            <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-white/10 text-muted-foreground group-hover:text-white transition-colors">⌘ K</span>
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="glass p-6 rounded-[2.5rem] border-primary/20 relative overflow-hidden group mb-8 cursor-pointer shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <Sparkles className="text-primary animate-pulse" size={18} />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Elite Status</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed relative z-10">Neural prioritization is maximizing your sales funnel.</p>
        </div>

        <div 
          onClick={logout}
          className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] p-4 rounded-[1.75rem] group hover:bg-white/[0.06] transition-all duration-500 cursor-pointer shadow-lg"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <img src={`https://picsum.photos/seed/admin/150/150`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.displayName || 'Member'}</p>
              <p className="text-[10px] text-muted-foreground/60 truncate font-black uppercase tracking-widest">{user?.role || 'User'}</p>
            </div>
          </div>
          <LogOut size={20} className="text-muted-foreground group-hover:text-primary transition-colors mr-2" />
        </div>
      </div>
    </div>
  );
}
