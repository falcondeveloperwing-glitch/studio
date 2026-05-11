'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Smile, 
  MessageSquare, 
  ArrowUpRight,
  Download,
  Calendar,
  Zap,
  ChevronDown,
  BrainCircuit
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Badge } from '@/components/ui/badge';

const data = [
  { name: 'Jan', sales: 4000, conv: 2400 },
  { name: 'Feb', sales: 3000, conv: 1398 },
  { name: 'Mar', sales: 6000, conv: 4800 },
  { name: 'Apr', sales: 4780, conv: 3908 },
  { name: 'May', sales: 7890, conv: 4800 },
  { name: 'Jun', sales: 6390, conv: 5800 },
  { name: 'Jul', sales: 9490, conv: 7300 },
];

const satisfactionData = [
  { name: 'Neural Positive', value: 75, color: 'hsl(var(--primary))' },
  { name: 'Satisfied', value: 15, color: 'hsl(var(--accent))' },
  { name: 'Neutral', value: 8, color: 'hsl(var(--muted))' },
  { name: 'Frustrated', value: 2, color: 'hsl(var(--destructive))' },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8 lg:p-14 space-y-20 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-2xl">
              <BrainCircuit size={28} />
            </div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Cognitive Dataset v2</p>
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-headline text-6xl lg:text-8xl font-bold tracking-tighter mb-4"
          >
            Deep Intelligence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-2xl lg:text-3xl max-w-2xl opacity-50 font-light"
          >
            Neural analysis of your Instagram commerce ecosystem.
          </motion.p>
        </div>
        <div className="flex gap-5">
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-16 px-10 font-black text-[10px] uppercase tracking-widest gap-3 shadow-2xl">
            <Download size={20} /> Export
          </Button>
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-16 px-10 font-black text-[10px] uppercase tracking-widest gap-3 shadow-2xl">
            <Calendar size={20} /> 30 Days <ChevronDown size={14} className="opacity-30" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { label: 'Conversations', value: '42,109', change: '+18.2%', icon: MessageSquare, color: 'primary' },
          { label: 'Avg Response', value: '0.4s', change: '-20.1%', icon: Clock, color: 'accent' },
          { label: 'Closure Rate', value: '14.2%', change: '+2.4%', icon: TrendingUp, color: 'emerald-500' },
          { label: 'Neural CSAT', value: '4.95/5', change: '+0.1%', icon: Smile, color: 'primary' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
          >
            <GlassCard className="border-white/[0.04] group hover:border-white/10 p-12 transition-all duration-700 rounded-[3rem]">
              <div className="flex justify-between items-start mb-14">
                <div className={`p-5 rounded-[1.75rem] transition-all duration-700 group-hover:scale-110 shadow-3xl ${stat.color === 'primary' ? 'bg-primary/20 text-primary' : stat.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                  <stat.icon size={30} />
                </div>
                <Badge variant="outline" className={`border-none font-black text-[10px] tracking-widest h-7 px-4 ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] uppercase tracking-[0.4em] font-black mb-2 opacity-40">{stat.label}</p>
              <p className="text-5xl font-bold font-headline tracking-tighter text-white">{stat.value}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <GlassCard className="h-full border-white/[0.04] p-16 rounded-[3.5rem]" variant="darker">
            <div className="flex items-center justify-between mb-24">
              <div>
                <h3 className="font-headline font-bold text-4xl lg:text-5xl tracking-tight mb-3 text-gradient">Neural Velocity</h3>
                <p className="text-[11px] text-muted-foreground tracking-[0.5em] uppercase font-black opacity-30">Volume vs. Recovered Revenue</p>
              </div>
              <div className="flex gap-10">
                <div className="flex items-center gap-4 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-primary glow-primary" /> Sales
                </div>
                <div className="flex items-center gap-4 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_#3b82f6]" /> Threads
                </div>
              </div>
            </div>
            <div className="h-[550px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
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
                    stroke="rgba(255,255,255,0.15)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={25}
                    fontFamily="Space Grotesk"
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 10, 12, 0.98)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '32px',
                      backdropFilter: 'blur(40px)',
                      padding: '24px'
                    }}
                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={8} fillOpacity={1} fill="url(#colorSales)" animationDuration={3000} />
                  <Area type="monotone" dataKey="conv" stroke="hsl(var(--accent))" strokeWidth={4} fillOpacity={1} fill="url(#colorConv)" strokeDasharray="15 15" animationDuration={4500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <GlassCard className="h-full border-white/[0.04] p-16 rounded-[3.5rem]" variant="darker">
            <h3 className="font-headline font-bold text-3xl mb-20 text-center tracking-tight">Emotional Spectrum</h3>
            <div className="h-[350px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    innerRadius={110}
                    outerRadius={150}
                    paddingAngle={15}
                    dataKey="value"
                    stroke="none"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-7xl font-bold font-headline tracking-tighter text-white">96%</p>
                <p className="text-[12px] text-primary uppercase font-black tracking-[0.5em]">Positive</p>
              </div>
            </div>
            
            <div className="mt-20 space-y-8">
              {satisfactionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                    <div className="w-4 h-4 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                    <span className="text-xs font-black text-muted-foreground group-hover:text-white transition-all uppercase tracking-[0.3em]">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">{item.value}%</span>
                </div>
              ))}
            </div>
            
            <div className="mt-20 pt-12 border-t border-white/[0.05]">
              <Button className="w-full h-16 bg-white/[0.04] hover:bg-white/[0.08] rounded-[2rem] text-[10px] font-black uppercase tracking-widest gap-4 transition-all duration-700 shadow-2xl group text-white">
                <Zap size={20} className="text-primary group-hover:animate-pulse" /> Neural Strategy Update
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}