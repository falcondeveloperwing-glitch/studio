'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/components/demo/demo-context';
import { 
  TrendingUp, 
  Clock, 
  Smile, 
  MessageSquare, 
  Download,
  Calendar,
  ChevronDown,
  Loader2
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
import { MOCK_STATS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const initialData = [
  { name: 'Jan', sales: 42000, conv: 24000 },
  { name: 'Feb', sales: 58000, conv: 32000 },
  { name: 'Mar', sales: 65000, conv: 41000 },
  { name: 'Apr', sales: 92000, conv: 58000 },
  { name: 'May', sales: 118000, conv: 74000 },
  { name: 'Jun', sales: 145000, conv: 92000 },
  { name: 'Jul', sales: 182000, conv: 124000 },
];

const satisfactionData = [
  { name: 'Satisfied', value: 82, color: '#fafafa' },
  { name: 'Neutral', value: 14, color: '#52525b' },
  { name: 'Negative', value: 4, color: '#27272a' },
];

export default function AnalyticsPage() {
  const { toast } = useToast();
  const { isActive, currentStep } = useDemo();
  const [exporting, setExporting] = useState(false);
  const [data, setData] = useState(initialData);

  // Demo Chart Simulation
  useEffect(() => {
    if (isActive && currentStep === 'analytics') {
      const interval = setInterval(() => {
        setData(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { 
            ...last, 
            sales: last.sales + 200, 
            conv: last.conv + 150 
          }];
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isActive, currentStep]);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      toast({
        title: "Report Generated",
        description: "Your July performance PDF is ready for download.",
      });
    }, 2000);
  };

  const handleFilter = () => {
    toast({
      title: "Date Range Applied",
      description: "Recalculating metrics for the last 30 days...",
    });
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics</h1>
          <p className="text-zinc-500 font-medium">Detailed performance insights and sales metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleExport}
            disabled={exporting}
            className="h-10 border-white/5 bg-white/[0.02] text-xs font-bold gap-2"
          >
            {exporting ? <Loader2 className="animate-spin" size={14} /> : <Download size={16} />}
            {exporting ? 'Processing...' : 'Export Data'}
          </Button>
          <Button variant="outline" onClick={handleFilter} className="h-10 border-white/5 bg-white/[0.02] text-xs font-bold gap-2">
            <Calendar size={16} /> Last 30 Days <ChevronDown size={12} className="opacity-50" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Inquiries', value: MOCK_STATS.aiReplies, change: '+22.4%', icon: MessageSquare },
          { label: 'Avg Speed', value: MOCK_STATS.avgSpeed, change: '-42.1%', icon: Clock },
          { label: 'Conversion Rate', value: MOCK_STATS.conversionRate, change: '+4.8%', icon: TrendingUp },
          { label: 'Customer Satisfaction', value: MOCK_STATS.satisfaction, change: '+0.4%', icon: Smile }
        ].map((stat, i) => (
          <GlassCard key={i} className="border-white/5 p-6 bg-zinc-950/50">
            <div className="flex justify-between items-start mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                <stat.icon size={16} />
              </div>
              <Badge variant="outline" className={`border-none font-bold text-[10px] ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500 bg-zinc-500/10'}`}>
                {stat.change}
              </Badge>
            </div>
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight text-white">{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 border-white/5 p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-bold text-xl mb-1">Sales Performance</h3>
              <p className="text-xs text-zinc-500">Revenue recovered vs. inquiry volume.</p>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="sales" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="conv" stroke="#52525b" strokeWidth={1.5} fill="none" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="border-white/5 p-8 flex flex-col justify-center">
          <h3 className="font-bold text-xl mb-10 text-center">Satisfaction</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
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
              <p className="text-4xl font-bold tracking-tight text-white">98%</p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Positive</p>
            </div>
          </div>
          
          <div className="mt-10 space-y-4">
            {satisfactionData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
