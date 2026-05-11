"use client";

import React from 'react';
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
    <div className="p-8 lg:p-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight mb-2">Neural Analytics</h1>
          <p className="text-muted-foreground text-lg">Deep-learning insights into your AI-driven sales funnel.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-12 px-6 font-bold gap-2">
            <Download size={18} /> Export Data
          </Button>
          <Button variant="outline" className="border-white/5 bg-white/5 rounded-2xl h-12 px-6 font-bold gap-2">
            <Calendar size={18} /> Last 30 Days <ChevronDown size={14} className="opacity-50" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Conversations', value: '42,109', change: '+18.2%', icon: MessageSquare, color: 'primary' },
          { label: 'Avg. Reply Time', value: '0.8s', change: '-20.1%', icon: Clock, color: 'accent' },
          { label: 'Conversion Rate', value: '14.2%', change: '+2.4%', icon: TrendingUp, color: 'emerald-500' },
          { label: 'Customer CSAT', value: '4.9/5', change: '+0.1%', icon: Smile, color: 'primary' }
        ].map((stat, i) => (
          <GlassCard key={i} className="border-white/5 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${stat.color === 'primary' ? 'bg-primary/20 text-primary' : stat.color === 'accent' ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'}`}>
                <stat.icon size={22} />
              </div>
              <Badge variant="outline" className={`border-none font-bold ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                {stat.change}
              </Badge>
            </div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-black mb-1">{stat.label}</p>
            <p className="text-3xl font-bold font-headline tracking-tighter">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 border-white/5" variant="darker">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="font-headline font-bold text-2xl tracking-tight mb-1">Conversion Velocity</h3>
              <p className="text-xs text-muted-foreground tracking-widest uppercase font-bold">Volume vs. Recovered Revenue</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Sales
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" /> Threads
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
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
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.15)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 12, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={5} fillOpacity={1} fill="url(#colorSales)" animationDuration={2500} />
                <Area type="monotone" dataKey="conv" stroke="hsl(var(--accent))" strokeWidth={3} fillOpacity={1} fill="url(#colorConv)" strokeDasharray="8 8" animationDuration={3000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="h-full border-white/5" variant="darker">
            <h3 className="font-headline font-bold text-xl mb-12 text-center tracking-tight">Sentiment Distribution</h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={10}
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
                <p className="text-4xl font-bold font-headline tracking-tighter text-white">96%</p>
                <p className="text-[10px] text-primary uppercase font-black tracking-widest">Positive</p>
              </div>
            </div>
            
            <div className="mt-12 space-y-5">
              {satisfactionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-white transition-colors uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white tracking-tight">{item.value}%</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5">
              <Button className="w-full h-12 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold gap-2">
                <Zap size={16} className="text-primary" /> Optimization Advice
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
