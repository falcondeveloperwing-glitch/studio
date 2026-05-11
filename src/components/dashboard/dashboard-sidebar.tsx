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
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalAuth } from '@/hooks/use-local-auth';

const navItems = [
  { label: 'Operational Hub', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Neural Inbox', icon: Inbox, href: '/dashboard/inbox' },
  { label: 'Knowledge Base', icon: BrainCircuit, href: '/dashboard/knowledge' },
  { label: 'Automations', icon: Zap, href: '/dashboard/automations' },
  { label: 'Deep Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'System Settings', icon: Settings, href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useLocalAuth();

  return (
    <div className="w-[380px] h-screen border-r border-white/[0.08] flex flex-col bg-[#020203] sticky top-0 z-[60]">
      <div className="absolute inset-0 noise z-0" />
      
      <div className="p-14 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-6 group">
          <div className="w-16 h-16 rounded-[1.75rem] bg-primary flex items-center justify-center glow-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-3xl">
            <Zap className="text-white fill-white" size={32} />
          </div>
          <div className="space-y-1">
            <span className="font-headline font-bold text-3xl tracking-tighter text-white">ReplyRush</span>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.4em]">v8.4 Active</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-10 py-6 space-y-20 relative z-10">
        <div>
          <p className="px-8 text-[11px] font-black text-muted-foreground/30 uppercase tracking-[0.6em] mb-10">Neural Management</p>
          <nav className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div whileHover={{ x: 8 }} className={cn(
                    "flex items-center justify-between px-8 py-6 rounded-[2.5rem] transition-all duration-700 group relative overflow-hidden",
                    isActive 
                      ? "bg-white/[0.08] text-white shadow-3xl ring-1 ring-white/10" 
                      : "text-muted-foreground/50 hover:bg-white/[0.03] hover:text-white"
                  )}>
                    <div className="flex items-center gap-6">
                      <item.icon size={26} className={cn(
                        "transition-all duration-700",
                        isActive ? "text-primary scale-110 glow-primary" : "group-hover:text-white"
                      )} />
                      <span className="font-bold text-xl tracking-tight">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={18} className="text-primary animate-pulse" />}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-12 bg-primary rounded-r-full glow-primary shadow-[0_0_30px_#6814f7]" />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-8">
          <Button variant="outline" className="w-full h-20 border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.06] rounded-[2.25rem] flex items-center justify-between px-10 group border-dashed transition-all duration-1000 shadow-2xl">
            <div className="flex items-center gap-5">
              <Command size={24} className="text-muted-foreground transition-transform group-hover:rotate-12" />
              <span className="text-base font-bold text-white/50 group-hover:text-white transition-colors">Neural Shell</span>
            </div>
            <span className="text-[11px] font-black px-4 py-2 rounded-2xl bg-white/10 text-muted-foreground group-hover:text-white group-hover:bg-primary transition-all shadow-inner">⌘ K</span>
          </Button>
        </div>
      </div>

      <div className="p-12 relative z-10 space-y-10">
        <div className="glass p-10 rounded-[3rem] border-primary/20 relative overflow-hidden group mb-10 cursor-pointer shadow-4xl transition-all hover:scale-[1.02] hover:bg-primary/5">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-[2s]" />
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <ShieldCheck className="text-primary animate-pulse" size={24} />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Enterprise Priority</span>
          </div>
          <p className="text-xs text-muted-foreground/70 font-medium leading-relaxed relative z-10 italic">Neural nodes are currently prioritizing high-value checkout threads.</p>
        </div>

        <div onClick={logout} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.08] p-6 rounded-[2.75rem] group hover:bg-white/[0.06] transition-all duration-700 cursor-pointer shadow-4xl">
          <div className="flex items-center gap-6 min-w-0">
            <div className="w-16 h-16 rounded-full border-4 border-white/10 overflow-hidden shadow-3xl group-hover:scale-110 transition-transform duration-[3s]">
              <img src={user?.avatar || `https://picsum.photos/seed/${user?.email}/200/200`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors tracking-tight">{user?.displayName || 'Member'}</p>
              <p className="text-[10px] text-muted-foreground/40 truncate font-black uppercase tracking-[0.4em]">{user?.role || 'User'}</p>
            </div>
          </div>
          <LogOut size={26} className="text-muted-foreground group-hover:text-primary transition-all mr-2 group-hover:translate-x-2" />
        </div>
      </div>
    </div>
  );
}
