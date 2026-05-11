
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
  ExternalLink
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
    <div className="p-12 space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 rounded-full px-4 py-1 text-[10px] font-black tracking-[0.3em] uppercase">
              Neural Command Active
            </Badge>
            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">System Load: 2.4%</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl font-bold tracking-tight mb-4"
          >
            Operational, {user?.displayName || 'Chief'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-xl"
          >
            Your AI fleet is currently monitoring <span className="text-white font-bold">142</span> active shopping threads.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard variant="darker" className="py-4 px-8 flex items-center gap-6 border-white/5 shadow-2xl">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020203] bg-muted overflow-hidden transition-transform hover:scale-110 hover:z-10 cursor-pointer">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="font-black text-white text-lg tracking-tight">42 Online</p>
              <p className="text-muted-foreground text-[10px] uppercase font-black tracking-widest">Active Shoppers</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Revenue Recovered', value: MOCK_STATS.revenueRecovered, change: '+24.8%', icon: DollarSign, color: 'emerald-500', glow: true },
          { label: 'Leads Recaptured', value: MOCK_STATS.leadsRecovered, change: '+12.4%', icon: Users, color: 'primary' },
          { label: 'Neural Accuracy', value: '99.4%', change: 'Elite', icon: Activity, color: 'accent' },
          { label: 'Avg AI Speed', value: MOCK_STATS.avgSpeed, change: '-40%', icon: Clock, color: 'primary' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
          >
            <GlassCard 
              className={stat.glow ? "border-primary/40 bg-primary/[0.04] glow-primary group" : "border-white/[0.04] group hover:border-white/10"}
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 ${stat.color === 'primary' ? 'bg-primary/20 text-primary' : stat.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                  <stat.icon size={24} />
                </div>
                <Badge variant="outline" className={`border-none font-black text-[10px] tracking-widest ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-black mb-1">{stat.label}</p>
              <p className="text-4xl font-bold font-headline tracking-tighter text-white">{stat.value}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <GlassCard className="h-full border-white/[0.04]" variant="darker">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="font-headline font-bold text-3xl tracking-tight mb-2">Conversion Velocity</h3>
                <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase font-black">Revenue Recovery Attribution</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Recovered
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" /> Conversations
                </div>
              </div>
            </div>
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={15} 
                    fontFamily="Space Grotesk"
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 12, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', backdropFilter: 'blur(20px)' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={6} animationDuration={3000} />
                  <Area type="monotone" dataKey="conv" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorConv)" strokeWidth={3} strokeDasharray="10 10" animationDuration={4000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          <GlassCard className="flex-1 flex flex-col border-white/[0.04]" variant="darker">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-headline font-bold text-2xl tracking-tight">Live Intelligence</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_-5px_#10b981]">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Syncing</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-8 overflow-y-auto pr-4 custom-scrollbar">
              {MOCK_LIVE_FEED.map((item, i) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex gap-5 group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:scale-110 ${
                    item.type === 'sale' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' :
                    item.type === 'lead' ? 'bg-primary/20 border-primary/30 text-primary' :
                    'bg-white/5 border-white/10 text-muted-foreground'
                  }`}>
                    {item.type === 'sale' ? <DollarSign size={20} /> : item.type === 'lead' ? <Users size={20} /> : <MessageCircle size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.title}</p>
                      <span className="text-[9px] font-black text-muted-foreground uppercase">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1 group-hover:text-white/80 transition-colors">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5">
              <GlassCard variant="borderless" className="p-5 bg-primary/5 border border-primary/20 group cursor-pointer hover:bg-primary/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">Neural Tip</span>
                      <p className="text-[10px] text-muted-foreground">Boost recovery by 12% with a 5% discount.</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </GlassCard>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
