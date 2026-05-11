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
  Activity,
  ChevronRight,
  Globe
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
  { name: 'Mon', revenue: 142000 },
  { name: 'Tue', revenue: 158000 },
  { name: 'Wed', revenue: 182000 },
  { name: 'Thu', revenue: 174000 },
  { name: 'Fri', revenue: 215000 },
  { name: 'Sat', revenue: 248000 },
  { name: 'Sun', revenue: 284000 },
];

export default function DashboardOverview() {
  return (
    <div className="p-8 lg:p-16 space-y-16 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="outline" className="border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest px-3 py-1 text-zinc-500">
              System v4.2.0
            </Badge>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Operations
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Command Overview</h1>
          <p className="text-zinc-500 text-lg font-medium">Real-time synchronization of your global AI sales infrastructure.</p>
        </div>
        <div className="flex items-center gap-4 pb-1">
          <Button variant="outline" className="h-12 border-white/10 bg-white/[0.02] text-xs font-bold gap-3 rounded-xl px-6">
            <Activity size={16} /> Technical Logs
          </Button>
          <Button className="h-12 bg-white text-black hover:bg-zinc-200 text-xs font-bold gap-3 rounded-xl px-6 shadow-xl">
            Scale Fleet <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Recovered Revenue', value: MOCK_STATS.revenueRecovered, change: '+18.5%', icon: DollarSign },
          { label: 'Neural AI Replies', value: MOCK_STATS.aiReplies, change: '+12.2%', icon: Zap },
          { label: 'Response Latency', value: MOCK_STATS.avgSpeed, change: '-42%', icon: Activity },
          { label: 'Conversion Delta', value: MOCK_STATS.conversionRate, change: '+4.1%', icon: TrendingUp }
        ].map((stat, i) => (
          <GlassCard key={i} className="border-white/5 bg-white/[0.01] p-10 group hover:border-white/10 transition-all rounded-[2rem]">
            <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                <stat.icon size={18} />
              </div>
              <Badge variant="outline" className="border-none font-bold text-[10px] text-emerald-500 bg-emerald-500/10 px-3 py-1">
                {stat.change}
              </Badge>
            </div>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-4xl font-bold tracking-tighter">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <GlassCard className="lg:col-span-2 border-white/5 bg-white/[0.01] p-12 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="font-bold text-2xl mb-2 tracking-tight">Revenue Velocity</h3>
              <p className="text-xs text-zinc-600 font-medium">Daily recovered GMV through automated negotiations.</p>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-white shadow-xl" /> AI Recovered
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.08}/>
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
                  dy={15} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#09090b', 
                    border: '1px solid #18181b', 
                    borderRadius: '16px', 
                    fontSize: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    padding: '16px'
                  }}
                  itemStyle={{ fontWeight: 'bold', color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ffffff" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2} 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="border-white/5 bg-white/[0.01] p-12 flex flex-col rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-bold text-2xl tracking-tight">Activity Feed</h3>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar max-h-[450px]">
            {MOCK_LIVE_FEED.map((item) => (
              <div key={item.id} className="flex gap-5 group cursor-pointer relative">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-zinc-600 group-hover:text-white group-hover:border-white/20 transition-all shadow-lg">
                  {item.type === 'sale' ? <DollarSign size={18} /> : item.type === 'lead' ? <TrendingUp size={18} /> : <MessageSquare size={18} />}
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold truncate tracking-tight text-white/90">{item.title}</p>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest whitespace-nowrap">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-10 border-t border-white/5">
            <Button variant="ghost" className="w-full justify-between h-14 text-zinc-500 hover:text-white hover:bg-white/[0.02] transition-all rounded-2xl px-6">
              <span className="text-[10px] font-bold uppercase tracking-widest">Download Full Audit</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
