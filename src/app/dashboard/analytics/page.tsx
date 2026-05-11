
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
  ChevronDown
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
  { name: 'Very Happy', value: 75, color: 'hsl(var(--primary))' },
  { name: 'Satisfied', value: 15, color: 'hsl(var(--accent))' },
  { name: 'Neutral', value: 8, color: 'hsl(var(--muted))' },
  { name: 'Unhappy', value: 2, color: 'hsl(var(--destructive))' },
];

export default function AnalyticsPage() {
  return (
    <div className="p-12 space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-headline text-5xl font-bold tracking-tight mb-3"
          >
            Deep Intelligence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl"
          >
            Neural analysis of your Instagram sales ecosystem.
          </motion.p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest gap-2">
            <Download size={18} /> Export Data
          </Button>
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest gap-2">
            <Calendar size={18} /> Last 30 Days <ChevronDown size={14} className="opacity-50" />
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Conversations', value: '42,109', change: '+18.2%', icon: MessageSquare, color: 'primary' },
          { label: 'Avg Neural Speed', value: '0.4s', change: '-20.1%', icon: Clock, color: 'accent' },
          { label: 'Closure Rate', value: '14.2%', change: '+2.4%', icon: TrendingUp, color: 'emerald-500' },
          { label: 'Global CSAT', value: '4.95/5', change: '+0.1%', icon: Smile, color: 'primary' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
          >
            <GlassCard className="border-white/[0.04] group hover:border-white/10 p-10 transition-all duration-500 rounded-[2.5rem]">
              <div className="flex justify-between items-start mb-10">
                <div className={`p-4 rounded-[1.5rem] transition-transform duration-700 group-hover:scale-110 shadow-2xl ${stat.color === 'primary' ? 'bg-primary/20 text-primary' : stat.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                  <stat.icon size={28} />
                </div>
                <Badge variant="outline" className={`border-none font-black text-[10px] tracking-widest h-6 px-3 ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-black mb-2">{stat.label}</p>
              <p className="text-4xl font-bold font-headline tracking-tighter text-white">{stat.value}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <GlassCard className="h-full border-white/[0.04] p-12 rounded-[3rem]" variant="darker">
            <div className="flex items-center justify-between mb-20">
              <div>
                <h3 className="font-headline font-bold text-3xl tracking-tight mb-2">Neural Velocity</h3>
                <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase font-black">Volume vs. Recovered Revenue</p>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-primary" /> Sales
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_#3b82f6]" /> Threads
                </div>
              </div>
            </div>
            <div className="h-[450px]">
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
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    dy={20}
                    fontFamily="Space Grotesk"
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 10, 12, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '32px',
                      backdropFilter: 'blur(30px)',
                      padding: '24px'
                    }}
                    itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={6} fillOpacity={1} fill="url(#colorSales)" animationDuration={3000} />
                  <Area type="monotone" dataKey="conv" stroke="hsl(var(--accent))" strokeWidth={3} fillOpacity={1} fill="url(#colorConv)" strokeDasharray="12 12" animationDuration={4000} />
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
          <GlassCard className="h-full border-white/[0.04] p-12 rounded-[3rem]" variant="darker">
            <h3 className="font-headline font-bold text-2xl mb-16 text-center tracking-tight">Emotional Spectrum</h3>
            <div className="h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    innerRadius={90}
                    outerRadius={125}
                    paddingAngle={12}
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
                <p className="text-6xl font-bold font-headline tracking-tighter text-white">96%</p>
                <p className="text-[11px] text-primary uppercase font-black tracking-[0.4em]">Positive</p>
              </div>
            </div>
            
            <div className="mt-16 space-y-7">
              {satisfactionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full shadow-[0_0_12px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                    <span className="text-xs font-black text-muted-foreground group-hover:text-white transition-all uppercase tracking-[0.2em]">{item.name}</span>
                  </div>
                  <span className="text-base font-bold text-white tracking-tight">{item.value}%</span>
                </div>
              ))}
            </div>
            
            <div className="mt-16 pt-10 border-t border-white/[0.05]">
              <Button className="w-full h-14 bg-white/[0.04] hover:bg-white/[0.08] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest gap-3 transition-all duration-500 shadow-xl group">
                <Zap size={18} className="text-primary group-hover:animate-pulse" /> Neural Strategy Update
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
