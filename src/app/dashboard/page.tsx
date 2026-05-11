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
  ArrowUpRight,
  Instagram,
  Sparkles
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
import { Badge } from '@/components/ui/badge';

const chartData = [
  { name: 'Mon', revenue: 4200, convs: 2400 },
  { name: 'Tue', revenue: 3800, convs: 2900 },
  { name: 'Wed', revenue: 5100, convs: 3800 },
  { name: 'Thu', revenue: 4700, convs: 3100 },
  { name: 'Fri', revenue: 6200, convs: 4800 },
  { name: 'Sat', revenue: 5800, convs: 4200 },
  { name: 'Sun', revenue: 7400, convs: 5300 },
];

export default function DashboardOverview() {
  return (
    <div className="p-8 lg:p-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase">
              Live Overview
            </Badge>
          </div>
          <h1 className="font-headline text-4xl font-bold mb-2 tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground text-lg">Your AI fleet recovered <span className="text-white font-medium">$1,240</span> in the last 24h.</p>
        </div>
        
        <GlassCard variant="darker" className="py-2 px-4 flex items-center gap-4 border-white/5">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020203] bg-muted overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-sm">
            <p className="font-bold text-white">42 Active</p>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Shoppers Now</p>
          </div>
        </GlassCard>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Leads Recovered', value: '1,248', change: '+12%', icon: Users, color: 'primary' },
          { label: 'Response Speed', value: '1.2s', change: '-0.4s', icon: Clock, color: 'accent' },
          { label: 'Revenue Saved', value: '$42,900', change: '+24%', icon: DollarSign, color: 'emerald-500' },
          { label: 'AI Performance', value: '98.2%', change: 'Elite', icon: Activity, color: 'primary', special: true }
        ].map((stat, i) => (
          <GlassCard key={i} className={stat.special ? "border-primary/30 bg-primary/[0.03] glow-primary" : "border-white/5"}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${stat.color === 'primary' ? 'bg-primary/20 text-primary' : stat.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                <stat.icon size={22} />
              </div>
              <Badge variant="outline" className={`border-none ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                {stat.change}
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-1">{stat.label}</p>
            <p className="text-3xl font-bold font-headline tracking-tighter">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <GlassCard className="lg:col-span-2 border-white/5" variant="darker">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-headline font-bold text-xl tracking-tight mb-1">Sales Trajectory</h3>
              <p className="text-xs text-muted-foreground tracking-wide uppercase font-bold">Revenue & Conversions</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-white/5 cursor-pointer hover:bg-white/10">7D</Badge>
              <Badge variant="outline" className="border-white/10 cursor-pointer hover:bg-white/5 opacity-50">30D</Badge>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.1)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 12, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={4} 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Live Activity Feed */}
        <GlassCard className="flex flex-col h-full border-white/5" variant="darker">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-xl tracking-tight">Live Pulse</h3>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Syncing</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  <Instagram size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">User <span className="text-primary tracking-tight">@client_90{i}</span></p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">"Replied: Shipping info provided."</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">{i * 3}m ago</span>
                    <Badge variant="outline" className="h-4 px-1 text-[8px] border-white/5 opacity-50">AI Reply</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <GlassCard variant="borderless" className="p-4 bg-primary/5 border border-primary/10 group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-xs font-bold text-white">AI Insights Available</span>
                </div>
                <ArrowUpRight size={14} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </GlassCard>
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
