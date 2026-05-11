'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Users, 
  DollarSign,
  MessageSquare,
  Zap,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  CartesianGrid 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_STATS, MOCK_LIVE_FEED } from '@/lib/mock-data';

const chartData = [
  { name: 'Mon', revenue: 84000 },
  { name: 'Tue', revenue: 92000 },
  { name: 'Wed', revenue: 115000 },
  { name: 'Thu', revenue: 108000 },
  { name: 'Fri', revenue: 142000 },
  { name: 'Sat', revenue: 168000 },
  { name: 'Sun', revenue: 194000 },
];

export default function DashboardOverview() {
  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Operational Command</h1>
          <p className="text-zinc-500 text-sm">Real-time performance monitoring of your AI sales ecosystem.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">System Nominal</span>
          </div>
          <Button variant="outline" className="h-10 border-zinc-800 bg-zinc-900/50 text-xs font-bold gap-2">
            <Activity size={14} /> Neural Logs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Revenue Recovered', value: MOCK_STATS.revenueRecovered, change: '+18.5%', icon: DollarSign, trend: 'up' },
          { label: 'Total AI Replies', value: MOCK_STATS.aiReplies, change: '+12.2%', icon: MessageSquare, trend: 'up' },
          { label: 'Avg Latency', value: MOCK_STATS.avgSpeed, change: '-42%', icon: Zap, trend: 'up' },
          { label: 'Lead Conversion', value: MOCK_STATS.conversionRate, change: '+4.1%', icon: TrendingUp, trend: 'up' }
        ].map((stat, i) => (
          <GlassCard key={i} className="group border-zinc-800/50 hover:border-zinc-700/50 bg-zinc-900/20">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all">
                <stat.icon size={18} />
              </div>
              <Badge variant="outline" className={`border-none font-bold text-[10px] ${stat.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-400 bg-zinc-400/10'}`}>
                {stat.change}
              </Badge>
            </div>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 border-zinc-800/50 bg-zinc-900/20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="font-bold text-lg mb-1">Revenue Velocity</h3>
              <p className="text-xs text-zinc-500">Global sales recaptured by AI over the last 7 sessions.</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-white" /> Recovered GMV
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#3f3f46" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#09090b', 
                    border: '1px solid #27272a', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ffffff" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2} 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col border-zinc-800/50 bg-zinc-900/20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Global Activity</h3>
            <Badge variant="outline" className="border-zinc-800 text-[9px] font-black uppercase tracking-widest px-2">Real-time</Badge>
          </div>
          <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_LIVE_FEED.map((item) => (
              <div key={item.id} className="flex gap-4 group cursor-pointer relative">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-500 group-hover:text-white transition-all shadow-lg">
                  {item.type === 'sale' ? <DollarSign size={18} /> : item.type === 'lead' ? <TrendingUp size={18} /> : <MessageSquare size={18} />}
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold truncate tracking-tight">{item.title}</p>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest whitespace-nowrap">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <Button variant="ghost" className="w-full justify-between h-12 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all rounded-xl">
              <span className="text-xs font-bold uppercase tracking-widest">Audit Full Dataset</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
