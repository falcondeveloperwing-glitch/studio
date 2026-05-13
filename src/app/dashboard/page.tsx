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
  User as UserIcon
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
import Link from 'next/link';

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
  const { toast } = useToast();
  const { isActive } = useDemo();
  const [configuring, setConfiguring] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoStats, setDemoStats] = useState({
    revenue: 842850,
    replies: 142942
  });

  // Metric Recalibration Animation
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setIsProcessing(true);
      
      setTimeout(() => {
        setDemoStats(prev => ({
          revenue: prev.revenue + Math.floor(Math.random() * 500),
          replies: prev.replies + Math.floor(Math.random() * 2)
        }));
        setIsProcessing(false);
      }, 500); // Processing Dwell
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

  return (
    <div className="space-y-12 max-w-7xl mx-auto w-full">
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
          <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-zinc-500 font-medium">Real-time overview of customer conversations and sales efficiency.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleConfigure}
            disabled={configuring}
            className="h-10 bg-white text-black hover:bg-zinc-200 text-xs font-bold rounded-lg px-6 shadow-xl active:scale-[0.98]"
          >
            {configuring ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
            {configuring ? 'Syncing...' : 'Sync Workspace'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Recovered Revenue', 
            value: isActive ? `$${demoStats.revenue.toLocaleString()}` : MOCK_STATS.revenueRecovered, 
            change: '+18.5%', 
            icon: DollarSign, 
            color: 'text-emerald-500' 
          },
          { 
            label: 'AI Responses', 
            value: isActive ? demoStats.replies.toLocaleString() : MOCK_STATS.aiReplies, 
            change: '+12.2%', 
            icon: Zap, 
            color: 'text-zinc-400' 
          },
          { label: 'Avg Speed', value: MOCK_STATS.avgSpeed, change: '-42%', icon: Activity, color: 'text-zinc-400' },
          { label: 'Conversion Rate', value: MOCK_STATS.conversionRate, change: '+4.1%', icon: TrendingUp, color: 'text-zinc-400' }
        ].map((stat, i) => (
          <GlassCard key={i} className={cn(
            "border-white/5 bg-white/[0.01] p-6 transition-all duration-300",
            isProcessing && i < 2 ? "processing-blur" : ""
          )}>
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500">
                <stat.icon size={16} />
              </div>
              <Badge variant="outline" className={cn("border-none font-bold text-[10px] px-2", stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500 bg-zinc-500/10')}>
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
              <h3 className="font-bold text-xl mb-1">Sales Recovery</h3>
              <p className="text-xs text-zinc-500">Revenue recaptured via automated follow-up logic.</p>
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
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="revenue" stroke="#ffffff" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={1.5} animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="border-white/5 bg-white/[0.01] p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-xl">Recent Activity</h3>
              <History size={16} className="text-zinc-600" />
            </div>
            <div className="space-y-8 flex-1">
              {MOCK_LIVE_FEED.map((item) => (
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
                    <div className="flex items-center gap-1.5 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                       <UserIcon size={10} className="text-zinc-500" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Operator: {item.operator}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <Button 
                variant="ghost" 
                className="w-full justify-between h-10 text-zinc-500 hover:text-white px-4 text-xs font-bold active:scale-[0.98]"
              >
                Full Audit Logs <ChevronRight size={14} />
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
