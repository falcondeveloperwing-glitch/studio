'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Users, 
  DollarSign,
  MessageCircle,
  Zap,
  ArrowUpRight,
  TrendingUp,
  ArrowRight
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
import { MOCK_STATS, MOCK_LIVE_FEED } from '@/lib/mock-data';

const chartData = [
  { name: 'Mon', revenue: 4200 },
  { name: 'Tue', revenue: 3800 },
  { name: 'Wed', revenue: 5100 },
  { name: 'Thu', revenue: 4700 },
  { name: 'Fri', revenue: 6200 },
  { name: 'Sat', revenue: 5800 },
  { name: 'Sun', revenue: 7400 },
];

export default function DashboardOverview() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Performance Overview</h1>
          <p className="text-zinc-500 text-sm">Monitor your AI sales fleet and recovery metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-500 rounded-full px-3 py-1 font-medium text-[10px] uppercase tracking-wider">
            System Live
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Recovered Sales', value: MOCK_STATS.revenueRecovered, change: '+12.5%', icon: DollarSign },
          { label: 'AI Responses', value: MOCK_STATS.aiReplies, change: '+8.2%', icon: MessageCircle },
          { label: 'Avg Latency', value: '0.12s', change: '-5%', icon: Zap },
          { label: 'Conversion', value: '24.8%', change: '+2.1%', icon: TrendingUp }
        ].map((stat, i) => (
          <GlassCard key={i} className="group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <stat.icon size={16} />
              </div>
              <span className="text-xs font-medium text-emerald-500">{stat.change}</span>
            </div>
            <p className="text-xs text-zinc-500 font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">Revenue Recovery</h3>
              <p className="text-xs text-zinc-500">Sales recaptured by AI over the last 7 days.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                <div className="w-2 h-2 rounded-full bg-white" /> Recovered
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ffffff" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col">
          <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_LIVE_FEED.map((item, i) => (
              <div key={item.id} className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-zinc-500 group-hover:text-white transition-colors">
                  {item.type === 'sale' ? <DollarSign size={18} /> : <MessageCircle size={18} />}
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold truncate tracking-tight">{item.title}</p>
                    <span className="text-[10px] text-zinc-600 font-medium">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/5">
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-white/5 text-xs font-bold text-zinc-400 hover:text-white transition-colors">
              View Activity Logs <ArrowRight size={14} />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
