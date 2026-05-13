'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, Building2, Check } from 'lucide-react';

const workspaces = [
  { id: 'nike', name: 'Nike Commerce', role: 'Owner', icon: 'N' },
  { id: 'urban', name: 'UrbanWear EU', role: 'Admin', icon: 'U' },
  { id: 'prime', name: 'Prime Agency', role: 'Member', icon: 'P' },
];

export function WorkspaceSwitcher() {
  const [active, setActive] = React.useState(workspaces[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between h-12 px-3 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl group">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-6 h-6 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-black shrink-0">
              {active.icon}
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-bold text-white truncate">{active.name}</p>
              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest truncate">{active.role}</p>
            </div>
          </div>
          <ChevronDown size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-950 border-white/10 text-white" align="start">
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        {workspaces.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onSelect={() => setActive(ws)}
            className="flex items-center justify-between py-2 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-zinc-400">
                {ws.icon}
              </div>
              <span className="text-xs font-medium">{ws.name}</span>
            </div>
            {active.id === ws.id && <Check size={14} className="text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem className="py-2 cursor-pointer text-zinc-500 hover:text-white">
          <Plus size={14} className="mr-2" />
          <span className="text-xs">Create Workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
