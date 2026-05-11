import React from 'react';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5">
        {children}
      </main>
    </div>
  );
}