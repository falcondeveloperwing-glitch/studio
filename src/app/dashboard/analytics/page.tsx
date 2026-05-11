"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Smile, 
  MessageSquare, 
  UserPlus,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, conv: 2400 },
  { name: 'Feb', sales: 3000, conv: 1398 },
  { name: 'Mar', sales: 2000, conv: 9800 },
  { name: 'Apr', sales: 2780, conv: 3908 },
  { name: 'May', sales: 1890, conv: 4800 },
  { name: 'Jun', sales: 2390, conv: 3800 },
  { name: 'Jul', sales: 3490, conv: 4300 },
];

const satisfactionData = [
  { name: 'Very Happy', value: 75, color: 'hsl(var(--primary))' },
  { name: 'Satisfied', value: 15, color: 'hsl(var(--accent))' },
  { name: 'Neutral', value: 8, color: 'hsl(var(--muted))' },
  { name: 'Unhappy', value: 2, color: 'hsl(var(--destructive))' },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-headline text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your AI-driven sales funnel performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 bg-white/5 text-xs font-bold rounded-xl h-10">Export CSV</Button>
          <Button variant="outline" className="border-white/10 bg-white/5 text-xs font-bold rounded-xl h-10">Last 30 Days</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Conversations', value: '42,109', change: '+18.2%', icon: MessageSquare, color: 'primary' },
          { label: 'Avg. Reply Time', value: '0.8s', change: '-20.1%', icon: Clock, color: 'accent' },
          { label: 'Conversion Rate', value: '14.2%', change: '+2.4%', icon: TrendingUp, color: 'emerald-500' },
          { label: 'Customer Satisfaction', value: '4.9/5', change: '+0.1%', icon: Smile, color: 'primary' }
        ].map((stat, i) => (
          <GlassCard key={i} className="relative overflow-hidden p-5">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}/20`}>
                <stat.icon className={`text-${stat.color}`} size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold font-headline">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-lg">Sales Recovery Trends</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" /> Recovered Sales
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-accent" /> Total Conversations
              </div>
            </div>
          </div>
          <div className="h-[350px]">
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
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="conv" stroke="hsl(var(--accent))" strokeWidth={2} fillOpacity={1} fill="url(#colorConv)" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="h-full">
            <h3 className="font-headline font-bold text-lg mb-8 text-center">Customer Satisfaction</h3>
            <div className="h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold font-headline">96%</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Positive</p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {satisfactionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Button({ children, variant, className, ...props }: any) {
  const base = "px-4 py-2 rounded-md font-medium transition-all text-sm";
  const variants: any = {
    primary: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-input bg-transparent hover:bg-white/5",
    ghost: "bg-transparent hover:bg-white/5",
  };
  return <button className={cn(base, variants[variant || 'primary'], className)} {...props}>{children}</button>;
}