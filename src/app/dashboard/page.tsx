'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Users, 
  Clock, 
  DollarSign,
  Activity,
  ArrowUpRight,
  Instagram,
  Sparkles,
  Zap,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  BrainCircuit
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
import { useLocalAuth } from '@/hooks/use-local-auth';

const chartData = [
  { name: 'Mon', revenue: 4200, conv: 120 },
  { name: 'Tue', revenue: 3800, conv: 105 },
  { name: 'Wed', revenue: 5100, conv: 156 },
  { name: 'Thu', revenue: 4700, conv: 140 },
  { name: 'Fri', revenue: 6200, conv: 210 },
  { name: 'Sat', revenue: 5800, conv: 198 },
  { name: 'Sun', revenue: 7400, conv: 245 },
];

export default function DashboardOverview() {
  const { user } = useLocalAuth();

  return (
    <div className="p-8 lg:p-14 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 rounded-full px-5 py-1.5 text-[10px] font-black tracking-[0.4em] uppercase">
              Neural Network Active
            </Badge>
            <span className="text-[10px] text-muted-foreground font-black tracking-[0.2em] uppercase opacity-40">Load: 0.12ms</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-headline text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Operational, {user?.displayName?.split(' ')[0] || 'Chief'}.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-xl lg:text-3xl max-w-2xl opacity-60 leading-relaxed font-light">
            Your AI sales fleet is currently managing <span className="text-white font-bold underline decoration-primary/40 underline-offset-8">142</span> active customer negotiations.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <GlassCard variant="darker" className="py-6 px-10 flex items-center gap-8 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-background bg-muted overflow-hidden transition-transform hover:scale-110 hover:z-10 cursor-pointer shadow-xl">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Active Shopper" className="w-full h-full object-cover" data-ai-hint="user face" />
                </div>
              ))}
            </div>
            <div>
              <p className="font-headline font-bold text-white text-2xl tracking-tight">42 Live</p>
              <p className="text-muted-foreground text-[10px] uppercase font-black tracking-widest opacity-50">Neural Shoppers</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {[
          { label: 'Revenue Recovered', value: MOCK_STATS.revenueRecovered, change: '+31.4%', icon: DollarSign, color: 'emerald-500', glow: true },
          { label: 'AI Negotiations', value: MOCK_STATS.aiReplies, change: '+18.2%', icon: MessageCircle, color: 'primary' },
          { label: 'Neural Accuracy', value: '99.8%', change: 'Elite', icon: BrainCircuit, color: 'accent' },
          { label: 'Closure Velocity', value: '0.3s', change: '-42%', icon: Clock, color: 'primary' }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}>
            <GlassCard className={stat.glow ? "border-primary/40 bg-primary/[0.04] glow-primary group" : "border-white/[0.04] group hover:border-white/15"}>
              <div className="flex justify-between items-start mb-10">
                <div className={`p-5 rounded-[1.75rem] transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-2xl ${stat.color === 'primary' ? 'bg-primary/20 text-primary' : stat.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                  <stat.icon size={28} />
                </div>
                <Badge variant="outline" className={`border-none font-black text-[10px] tracking-widest px-3 h-7 ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] uppercase tracking-[0.4em] font-black mb-2 opacity-50">{stat.label}</p>
              <p className="text-5xl font-bold font-headline tracking-tighter text-white">{stat.value}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
          <GlassCard className="h-full border-white/[0.05] p-12 lg:p-16" variant="darker">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-20">
              <div>
                <h3 className="font-headline font-bold text-4xl lg:text-5xl tracking-tight mb-3">Conversion Velocity</h3>
                <p className="text-[10px] text-muted-foreground tracking-[0.5em] uppercase font-black opacity-50">Revenue Recovery Attribution Flow</p>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-primary glow-primary" /> Recovered
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_#3b82f6]" /> Volume
                </div>
              </div>
            </div>
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dy={20} fontFamily="Space Grotesk" />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 10, 12, 0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', backdropFilter: 'blur(30px)', padding: '24px' }} itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={6} animationDuration={3000} />
                  <Area type="monotone" dataKey="conv" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorConv)" strokeWidth={4} strokeDasharray="12 12" animationDuration={4000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-10 lg:gap-14">
          <GlassCard className="flex-1 flex flex-col border-white/[0.05] p-12" variant="darker">
            <div className="flex items-center justify-between mb-12">
              <h3 className="font-headline font-bold text-3xl tracking-tight">Neural Feed</h3>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_-5px_#10b981]">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Real-time</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-10 overflow-y-auto pr-4 custom-scrollbar">
              {MOCK_LIVE_FEED.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="flex gap-6 group cursor-pointer">
                  <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center shrink-0 border transition-all duration-700 group-hover:scale-110 group-hover:shadow-2xl ${
                    item.type === 'sale' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' :
                    item.type === 'lead' ? 'bg-primary/20 border-primary/30 text-primary' :
                    'bg-white/5 border-white/10 text-muted-foreground'
                  }`}>
                    {item.type === 'sale' ? <DollarSign size={24} /> : item.type === 'lead' ? <Users size={24} /> : <Zap size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-base font-bold text-white group-hover:text-primary transition-colors tracking-tight">{item.title}</p>
                      <span className="text-[10px] font-black text-muted-foreground/40 uppercase">{item.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground/60 leading-relaxed line-clamp-1 group-hover:text-white/80 transition-colors">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-14 pt-10 border-t border-white/5">
              <GlassCard variant="borderless" className="p-8 bg-primary/5 border border-primary/20 group cursor-pointer hover:bg-primary/10 transition-all rounded-[2rem]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-2xl bg-primary/20 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Insight</span>
                      <p className="text-xs text-muted-foreground/60 mt-1">Boost recovery by <span className="text-primary font-bold">14%</span> by using "Elite" tone.</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="text-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </div>
              </GlassCard>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}