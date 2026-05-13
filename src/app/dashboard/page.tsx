'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { useDemo } from '@/components/demo/demo-context';
import { 
  DollarSign,
  MessageSquare,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
  CheckCircle2,
  Loader2,
  History,
  ShieldCheck,
  ArrowUpRight,
  User as UserIcon,
  Clock,
  LayoutDashboard,
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
import { MOCK_STATS, MOCK_LIVE_FEED } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useLocalAuth } from '@/hooks/use-local-auth';
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
  const { toast } = useToast();
  const { isActive } = useDemo();
  const { user } = useLocalAuth();
  const [configuring, setConfiguring] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoStats, setDemoStats] = useState({
    revenue: 842850,
    replies: 142942,
    personalReplies: 84
  });

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setDemoStats(prev => ({
          revenue: prev.revenue + Math.floor(Math.random() * 500),
          replies: prev.replies + Math.floor(Math.random() * 2),
          personalReplies: prev.personalReplies + 1
        }));
        setIsProcessing(false);
      }, 500);
    }, 2500);
    return () => clearInterval(interval);
  }, [isActive]);

  const handleConfigure = () => {
    setConfiguring(true);
    setTimeout(() => {
      setConfiguring(false);
      toast({
        title: "Workspace Optimized",
        description: "AI nodes recalibrated for current traffic.",
      });
    }, 1500);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-12 max-w-7xl mx-auto w-full">
      {/* Role-Based Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Link href="/dashboard/status" className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/10 bg-emerald-500/5 text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10 transition-colors">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Infrastructure Healthy
            </Link>
            <Badge variant="outline" className="border-white/10 bg-white/[0.02] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 text-zinc-500">
              v4.2.1-stable
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {isAdmin ? 'Command Center' : 'Daily Workflow'}
          </h1>
          <p className="text-zinc-500 font-medium">
            {isAdmin 
              ? 'Strategic overview of workspace performance and fleet activity.' 
              : 'Focused view of your active conversations and personal response metrics.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <Button 
              onClick={handleConfigure}
              disabled={configuring}
              className="h-10 bg-white text-black hover:bg-zinc-200 text-xs font-bold rounded-lg px-6 shadow-xl active:scale-[0.98]"
            >
              {configuring ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
              {configuring ? 'Syncing...' : 'Sync Fleet'}
            </Button>
          ) : (
            <Link href="/dashboard/inbox">
              <Button className="h-10 bg-white text-black hover:bg-zinc-200 text-xs font-bold rounded-lg px-6 shadow-xl active:scale-[0.98]">
                Go to Inbox <ChevronRight size={14} className="ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Role-Based Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdmin ? (
          // Admin Metrics: Strategic Focus
          <>
            {[
              { label: 'Fleet Revenue', value: isActive ? `$${demoStats.revenue.toLocaleString()}` : MOCK_STATS.revenueRecovered, change: '+18.5%', icon: DollarSign },
              { label: 'Total AI Replies', value: isActive ? demoStats.replies.toLocaleString() : MOCK_STATS.aiReplies, change: '+12.2%', icon: Zap },
              { label: 'Fleet Conversion', value: MOCK_STATS.conversionRate, change: '+4.1%', icon: TrendingUp },
              { label: 'Avg Speed', value: MOCK_STATS.avgSpeed, change: '-42%', icon: Activity }
            ].map((stat, i) => (
              <StatCard key={i} {...stat} isProcessing={isProcessing && i < 2} />
            ))}
          </>
        ) : (
          // Agent Metrics: Execution Focus
          <>
            {[
              { label: 'Your Active DMs', value: '24', change: 'Personal', icon: MessageSquare },
              { label: 'Personal Replies', value: demoStats.personalReplies.toString(), change: '+8 Today', icon: Target },
              { label: 'Avg Response', value: '1.2m', change: '-12%', icon: Clock },
              { label: 'Lead Value', value: '$8,420', change: '+22%', icon: DollarSign }
            ].map((stat, i) => (
              <StatCard key={i} {...stat} isProcessing={isProcessing && i === 1} />
            ))}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role-Based Main Content */}
        <GlassCard className="lg:col-span-2 border-white/5 bg-white/[0.01] p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-bold text-xl mb-1">
                {isAdmin ? 'Sales Recovery' : 'Response Velocity'}
              </h3>
              <p className="text-xs text-zinc-500">
                {isAdmin 
                  ? 'Revenue recaptured via automated follow-up logic.' 
                  : 'Your daily interaction volume and response speed.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">7 Day Trend</span>
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
                  cursor={{ stroke: '#ffffff10', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey={isAdmin ? 'revenue' : 'interactions'} 
                  stroke="#ffffff" 
                  fillOpacity={1} 
                  fill="url(#colorMain)" 
                  strokeWidth={1.5} 
                  animationDuration={1000} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Unified Activity Feed */}
        <div className="space-y-6">
          <GlassCard className="border-white/5 bg-white/[0.01] p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-xl">{isAdmin ? 'Fleet Activity' : 'Your Feed'}</h3>
              <History size={16} className="text-zinc-600" />
            </div>
            <div className="space-y-8 flex-1">
              {MOCK_LIVE_FEED.slice(0, 4).map((item) => (
                <div key={item.id} className="flex gap-4 group cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-zinc-600 group-hover:text-white transition-colors">
                    {item.type === 'sale' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <MessageSquare size={14} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-bold truncate text-white/90">{item.title}</p>
                      <span className="text-[10px] text-zinc-600 font-bold uppercase whitespace-nowrap ml-2">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-normal line-clamp-2">{item.description}</p>
                    {isAdmin && (
                      <div className="flex items-center gap-1.5 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                         <UserIcon size={10} className="text-zinc-500" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Operator: {item.operator}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <Button 
                variant="ghost" 
                className="w-full justify-between h-10 text-zinc-500 hover:text-white px-4 text-xs font-bold active:scale-[0.98]"
              >
                {isAdmin ? 'View Audit Logs' : 'View All Tasks'} <ChevronRight size={14} />
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, isProcessing }: any) {
  return (
    <GlassCard className={cn(
      "border-white/5 bg-white/[0.01] p-6 transition-all duration-300",
      isProcessing ? "processing-blur" : ""
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500">
          <Icon size={16} />
        </div>
        <Badge variant="outline" className={cn("border-none font-bold text-[10px] px-2", change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500 bg-zinc-500/10')}>
          {change}
        </Badge>
      </div>
      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </GlassCard>
  );
}
