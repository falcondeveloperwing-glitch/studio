'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Inbox,
  Database,
  Zap,
  BarChart3,
  Settings,
  Search,
  Plus,
  LogOut,
  ShieldCheck,
  LifeBuoy
} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 h-9 bg-white/[0.03] border border-white/10 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all text-xs w-full max-w-[200px]"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Quick Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="bg-zinc-950 border-t border-white/5">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Overview</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/inbox'))}>
              <Inbox className="mr-2 h-4 w-4" />
              <span>Inbox</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/knowledge'))}>
              <Database className="mr-2 h-4 w-4" />
              <span>Knowledge Base</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/automations'))}>
              <Zap className="mr-2 h-4 w-4" />
              <span>Automations</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/analytics'))}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/settings'))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/status'))}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>System Status</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Help">
            <CommandItem onSelect={() => runCommand(() => router.push('/contact'))}>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Contact Support</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
