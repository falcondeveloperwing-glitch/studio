'use client';

import React, { useState, useMemo } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { 
  DollarSign,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
  Loader2,
  History,
  User as UserIcon,
  Target
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
import { doc } from 'firebase/firestore';
import Link from 'next/link';

const chartData = [
  { name: 'Mon', revenue: 142000, interactions: 120 },
  { name: 'Tue', revenue: 158000, interactions: 145 },
  { name: 'Wed', revenue: 182000, interactions: 180 },
  { name: 'Thu', revenue: 174000, interactions: 160 },
  { name: 'Fri', revenue: 215000, interactions: 210 },
  { name: 'Sat', revenue: 248000, interactions: 240 },
  { name: 'Sun', revenue: 284000, interactions: 310 },
];

export default function DashboardOverview() {
  const { user } = useUser();
  const db = useFirestore();

  const userRef = useMemo(() => (user ? doc(db, 'users', user.uid) : null), [user, db]);
  const { data: profile, loading: profileLoading } = useDoc(userRef);

  const analyticsRef = useMemo(() => (user ? doc(db, 'users', user.uid, 'analytics', 'overview') : null), [user, db]);
  const { data: stats, loading: statsLoading } = useDoc(analyticsRef);

  const isAdmin = profile?.role === 'admin';

  if (profileLoading || statsLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-zinc-700" /></div>;

  return (
    <div className="space-y-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Link href="/dashboard/status" className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10 transition-colors">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Infrastructure Healthy
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {isAdmin ? 'Command Center' : 'Daily Workflow'}
          </h1>
          <p className="text-zinc-500 font-medium">
            {isAdmin 
              ? `Strategic overview for ${profile?.brandName || 'your brand'}.` 
              : 'Focused view of your active conversations.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/inbox">
            <Button className="h-10 bg-white text-black hover:bg-zinc-200 text-xs font-bold rounded-lg px-6 shadow-xl">
              Go to Inbox <ChevronRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue Recovered', value: `$${(stats?.recoveredSales || 0).toLocaleString()}`, change: '+18.5%', icon: DollarSign },
          { label: 'Total AI Replies', value: (stats?.totalConvs || 0).toLocaleString(), change: '+12.2%', icon: Zap },
          { label: 'Avg Speed', value: `${stats?.avgReplyTime || '0.1'}s`, change: '-42%', icon: Activity },
          { label: 'CSAT Score', value: stats?.csat || '4.9/5', change: '+4.1%', icon: Target }
        ].map((stat, i) => (
          <GlassCard key={i} className="border-white/5 bg-white/[0.01] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500">
                <stat.icon size={16} />
              </div>
              <Badge variant="outline" className="border-none font-bold text-[10px] px-2 text-emerald-500 bg-emerald-500/10">
                {stat.change}
              </Badge>
            </div>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 border-white/5 bg-white/[0.01] p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-bold text-xl mb-1">Performance Trend</h3>
              <p className="text-xs text-zinc-500">Daily interaction volume and speed.</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.05}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#3f3f46" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #18181b', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ffffff" fillOpacity={1} fill="url(#colorMain)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="border-white/5 bg-white/[0.01] p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl">Recent Logs</h3>
            <History size={16} className="text-zinc-600" />
          </div>
          <div className="space-y-8 flex-1">
            <div className="text-center py-10 text-zinc-500 text-xs">
              No recent activity recorded.
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
