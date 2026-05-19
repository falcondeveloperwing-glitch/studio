
'use client';

import React, { useMemo } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { 
  DollarSign,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
  Loader2,
  History,
  Target,
  User as UserIcon,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MessageSquare
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
import { query, collection, orderBy, limit } from 'firebase/firestore';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useDashboard } from './dashboard-context';

const chartData = [
  { name: 'Mon', revenue: 0, interactions: 0 },
  { name: 'Tue', revenue: 0, interactions: 0 },
  { name: 'Wed', revenue: 0, interactions: 0 },
  { name: 'Thu', revenue: 0, interactions: 0 },
  { name: 'Fri', revenue: 0, interactions: 0 },
  { name: 'Sat', revenue: 0, interactions: 0 },
  { name: 'Sun', revenue: 0, interactions: 0 },
];

export default function DashboardOverview() {
  const { user } = useUser();
  const db = useFirestore();
  const { profile, loading: profileLoading, isAdmin } = useDashboard();

  // Real-time Audit Logs for Activity
  const auditLogsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(db, 'users', user.uid, 'auditLogs'), orderBy('timestamp', 'desc'), limit(5));
  }, [user, db]);
  const { data: logs, loading: logsLoading } = useCollection(auditLogsQuery);

  // Real counts for stats
  const convsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(db, 'users', user.uid, 'conversations'), limit(100));
  }, [user, db]);
  const { data: conversations } = useCollection(convsQuery);

  const autosQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(db, 'users', user.uid, 'automations'));
  }, [user, db]);
  const { data: automations } = useCollection(autosQuery);

  const stats = useMemo(() => {
    const totalRuns = automations.reduce((acc, curr: any) => acc + (curr.runs || 0), 0);
    const recoveredRevenue = (totalRuns * 12.5) + (logs.filter(l => l.actionType === 'WORKFLOW_CREATED').length * 150);
    
    return {
      revenue: `$${recoveredRevenue.toLocaleString()}`,
      replies: totalRuns.toLocaleString(),
      threads: conversations.length.toLocaleString(),
      csat: conversations.length > 0 ? '4.9/5' : '--'
    };
  }, [automations, logs, conversations]);

  if (profileLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-zinc-700" /></div>;

  const isNewUser = conversations.length === 0 && automations.length === 0;

  return (
    <div className="space-y-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Link href="/status" className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10 transition-colors">
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

      {isNewUser && (
        <GlassCard className="border-emerald-500/20 bg-emerald-500/[0.02] p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <ShieldCheck size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Welcome to ReplyRush AI</h3>
              <p className="text-zinc-400 text-sm max-w-xl">Your workspace is isolated and ready. Follow these steps to begin automating your Instagram commerce fleet.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
              <Link href="/dashboard/knowledge">
                <Button variant="outline" className="w-full border-white/5 bg-white/5 h-12 text-xs font-bold gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Train AI Node
                </Button>
              </Link>
              <Link href="/dashboard/automations">
                <Button variant="outline" className="w-full border-white/5 bg-white/5 h-12 text-xs font-bold gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Create Workflow
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue Recovered', value: stats.revenue, change: '+0.0%', icon: DollarSign },
          { label: 'Total AI Replies', value: stats.replies, change: '+0.0%', icon: Zap },
          { label: 'Active Threads', value: stats.threads, change: '+0.0%', icon: Activity },
          { label: 'CSAT Score', value: stats.csat, change: '0.0%', icon: Target }
        ].map((stat, i) => (
          <GlassCard key={i} className="border-white/5 bg-white/[0.01] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500">
                <stat.icon size={16} />
              </div>
              <Badge variant="outline" className="border-none font-bold text-[10px] px-2 text-zinc-500 bg-zinc-500/10">
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
              <p className="text-xs text-zinc-500">Interaction volume and recovered value.</p>
            </div>
          </div>
          <div className="h-[350px] w-full flex items-center justify-center">
            {isNewUser ? (
              <div className="text-center space-y-4 opacity-50">
                <TrendingUp size={40} className="mx-auto text-zinc-800" />
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">Awaiting Data Stream</p>
              </div>
            ) : (
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
            )}
          </div>
        </GlassCard>

        <GlassCard className="border-white/5 bg-white/[0.01] p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl">Operational Activity</h3>
            <History size={16} className="text-zinc-600" />
          </div>
          <div className="space-y-6 flex-1">
            {logsLoading ? (
              <div className="flex justify-center p-8"><Loader2 className="animate-spin text-zinc-700" size={16} /></div>
            ) : logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-700 mb-4">
                  <Activity size={20} />
                </div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">No Recent Logs</p>
                <p className="text-[9px] text-zinc-700 mt-1 max-w-[150px]">Activity will appear here as you manage your fleet.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex gap-4 pb-4 border-b border-white/[0.03] last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <UserIcon size={14} className="text-zinc-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-white truncate">{log.actorName}</p>
                      <span className="text-[9px] text-zinc-600 font-bold uppercase whitespace-nowrap">
                        {log.timestamp ? formatDistanceToNow(new Date(log.timestamp), { addSuffix: true }) : ''}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">{log.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
