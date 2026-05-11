
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
  BrainCircuit,
  Command,
  ArrowRight,
  ShieldCheck,
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
    <div className="p-8 lg:p-16 space-y-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 rounded-full px-6 py-2 text-[10px] font-black tracking-[0.4em] uppercase">
              Neural Network: Active
            </Badge>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black tracking-widest uppercase opacity-40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Agency Mode v2.4
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-headline text-6xl lg:text-9xl font-bold tracking-tighter leading-[0.8] text-white">
            Revenue <br/> Velocity.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-2xl lg:text-3xl max-w-2xl opacity-50 font-light leading-relaxed">
            Your AI fleet is currently negotiating with <span className="text-white font-bold underline decoration-primary/40 underline-offset-8">142</span> high-intent shoppers, recovering <span className="text-emerald-500 font-bold">$12k+</span> in potential churn today.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <GlassCard variant="darker" className="py-10 px-14 flex items-center gap-12 border-white/5 shadow-3xl rounded-[3rem]">
            <div className="flex -space-x-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-20 h-20 rounded-full border-8 border-[#020203] bg-muted overflow-hidden transition-all hover:scale-110 hover:z-10 cursor-pointer shadow-2xl">
                  <img src={`https://picsum.photos/seed/user${i}/150/150`} alt="Active Shopper" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="font-headline font-bold text-white text-4xl tracking-tight">42 Leads</p>
              <p className="text-muted-foreground text-[10px] uppercase font-black tracking-[0.4em] opacity-40">Live Negotiations</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { label: 'Recovered Capital', value: MOCK_STATS.revenueRecovered, change: '+31.4%', icon: DollarSign, color: 'primary', glow: true },
          { label: 'AI Negotiations', value: MOCK_STATS.aiReplies, change: '+18.2%', icon: MessageCircle, color: 'accent' },
          { label: 'Neural Accuracy', value: '99.8%', change: 'Target', icon: Target, color: 'primary' },
          { label: 'Avg Latency', value: '0.12s', change: '-42%', icon: Zap, color: 'emerald-500' }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}>
            <GlassCard className={stat.glow ? "border-primary/20 bg-primary/[0.04] group rounded-[2.75rem]" : "border-white/[0.04] group hover:border-white/10 rounded-[2.75rem]"}>
              <div className="flex justify-between items-start mb-16">
                <div className={`p-6 rounded-[2rem] transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-2xl ${stat.color === 'primary' ? 'bg-primary/20 text-primary' : stat.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                  <stat.icon size={32} />
                </div>
                <Badge variant="outline" className={`border-none font-black text-[10px] tracking-widest px-4 h-8 ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] uppercase tracking-[0.4em] font-black mb-2 opacity-40">{stat.label}</p>
              <p className="text-6xl font-bold font-headline tracking-tighter text-white">{stat.value}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-14">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="xl:col-span-2">
          <GlassCard className="h-full border-white/[0.05] p-16 rounded-[4rem]" variant="darker">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-10 mb-24">
              <div className="space-y-3">
                <h3 className="font-headline font-bold text-5xl tracking-tight text-white">Conversion Funnel</h3>
                <p className="text-[10px] text-muted-foreground tracking-[0.5em] uppercase font-black opacity-30">Neural Lead Processing Performance</p>
              </div>
              <div className="flex gap-12">
                <div className="flex items-center gap-4 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary glow-primary" /> Recaptured
                </div>
                <div className="flex items-center gap-4 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_20px_#3b82f6]" /> Raw Volume
                </div>
              </div>
            </div>
            <div className="h-[550px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} dy={25} fontFamily="Space Grotesk" />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(5, 5, 8, 0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', backdropFilter: 'blur(40px)', padding: '32px' }} itemStyle={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }} cursor={{ stroke: 'rgba(255,255,255,0.15)', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={8} animationDuration={3000} />
                  <Area type="monotone" dataKey="conv" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorConv)" strokeWidth={4} strokeDasharray="15 15" animationDuration={4500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-14">
          <GlassCard className="flex-1 flex flex-col border-white/[0.05] p-16 rounded-[4rem]" variant="darker">
            <div className="flex items-center justify-between mb-16">
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-4xl tracking-tight text-white">Live Intelligence</h3>
                <p className="text-[10px] text-muted-foreground tracking-[0.4em] uppercase font-black opacity-30">Neural Activity Stream</p>
              </div>
              <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Global Sync</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-12 overflow-y-auto pr-6 custom-scrollbar">
              {MOCK_LIVE_FEED.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="flex gap-8 group cursor-pointer">
                  <div className={`w-20 h-20 rounded-[2.25rem] flex items-center justify-center shrink-0 border transition-all duration-700 group-hover:scale-110 group-hover:shadow-3xl ${
                    item.type === 'sale' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' :
                    item.type === 'lead' ? 'bg-primary/20 border-primary/30 text-primary' :
                    'bg-white/5 border-white/10 text-muted-foreground'
                  }`}>
                    {item.type === 'sale' ? <DollarSign size={32} /> : item.type === 'lead' ? <Users size={32} /> : <Zap size={32} />}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">{item.title}</p>
                      <span className="text-[11px] font-black text-muted-foreground/30 uppercase tracking-tighter">{item.timestamp}</span>
                    </div>
                    <p className="text-base text-muted-foreground/60 leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 pt-12 border-t border-white/5">
              <div className="p-10 bg-primary/5 border border-primary/20 group cursor-pointer hover:bg-primary/10 transition-all rounded-[3rem] shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-primary/20 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all shadow-3xl">
                      <Sparkles size={28} />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Acquisition Potential</span>
                      <p className="text-sm text-muted-foreground/70 mt-2 font-light">Recovery probability optimized by <span className="text-primary font-bold">14.2%</span>.</p>
                    </div>
                  </div>
                  <ArrowRight size={28} className="text-primary group-hover:translate-x-3 transition-transform" />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
