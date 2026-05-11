"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Users, 
  Clock, 
  MessageSquare, 
  TrendingUp, 
  DollarSign,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const chartData = [
  { name: 'Mon', revenue: 4000, convs: 2400 },
  { name: 'Tue', revenue: 3000, convs: 1398 },
  { name: 'Wed', revenue: 2000, convs: 9800 },
  { name: 'Thu', revenue: 2780, convs: 3908 },
  { name: 'Fri', revenue: 1890, convs: 4800 },
  { name: 'Sat', revenue: 2390, convs: 3800 },
  { name: 'Sun', revenue: 3490, convs: 4300 },
];

export default function DashboardOverview() {
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="font-headline text-3xl font-bold mb-1">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's what's happening with your AI assistant today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                U{i}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground"><span className="text-primary font-bold">12</span> users active now</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard className="relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Users className="text-primary" size={20} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              +12% <ArrowUpRight size={14} />
            </div>
          </div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-1">Leads Recovered</p>
          <p className="text-2xl font-bold font-headline">1,248</p>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/10 blur-2xl rounded-full" />
        </GlassCard>

        <GlassCard className="relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-accent/20">
              <Clock className="text-accent" size={20} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              -0.4s <ArrowUpRight size={14} />
            </div>
          </div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-1">Response Speed</p>
          <p className="text-2xl font-bold font-headline">1.2s</p>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent/10 blur-2xl rounded-full" />
        </GlassCard>

        <GlassCard className="relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <DollarSign className="text-emerald-500" size={20} />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              +24% <ArrowUpRight size={14} />
            </div>
          </div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-1">Revenue Recovered</p>
          <p className="text-2xl font-bold font-headline">$42,900</p>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-emerald-500/10 blur-2xl rounded-full" />
        </GlassCard>

        <GlassCard className="relative overflow-hidden border-primary/30 bg-primary/[0.03]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-primary">
              <Activity className="text-white" size={20} />
            </div>
            <div className="flex items-center gap-1 text-primary text-xs font-bold">
              Elite
            </div>
          </div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-1">AI Performance</p>
          <p className="text-2xl font-bold font-headline">98.2%</p>
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
        </GlassCard>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-lg">Sales Activity</h3>
            <select className="bg-transparent text-xs text-muted-foreground border-none outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Live Activity Feed */}
        <GlassCard className="flex flex-col h-full">
          <h3 className="font-headline font-bold text-lg mb-6 flex items-center gap-2">
            Live Activity <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Instagram size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Customer <span className="text-primary">@user_{i}23</span> asked about pricing</p>
                  <p className="text-[11px] text-muted-foreground mt-1">AI replied: "Check our premium collection..." · 2m ago</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Instagram({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}