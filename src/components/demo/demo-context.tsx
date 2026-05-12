'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type DemoStep = 
  | 'idle' 
  | 'landing' 
  | 'login' 
  | 'dashboard' 
  | 'inbox' 
  | 'automations' 
  | 'analytics' 
  | 'pricing' 
  | 'complete';

interface DemoContextType {
  isActive: boolean;
  currentStep: DemoStep;
  startDemo: () => void;
  stopDemo: () => void;
  nextStep: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<DemoStep>('idle');
  const router = useRouter();
  const pathname = usePathname();

  const stopDemo = useCallback(() => {
    setIsActive(false);
    setCurrentStep('idle');
  }, []);

  const startDemo = useCallback(() => {
    setIsActive(true);
    setCurrentStep('landing');
    router.push('/');
  }, [router]);

  const nextStep = useCallback(() => {
    const steps: DemoStep[] = ['landing', 'login', 'dashboard', 'inbox', 'automations', 'analytics', 'pricing', 'complete'];
    const nextIdx = steps.indexOf(currentStep) + 1;
    if (nextIdx < steps.length) {
      const next = steps[nextIdx];
      setCurrentStep(next);
      
      // Auto Navigation Logic
      if (next === 'login') router.push('/login');
      if (next === 'dashboard') router.push('/dashboard');
      if (next === 'inbox') router.push('/dashboard/inbox');
      if (next === 'automations') router.push('/dashboard/automations');
      if (next === 'analytics') router.push('/dashboard/analytics');
      if (next === 'pricing') router.push('/pricing');
      if (next === 'complete') {
        setTimeout(stopDemo, 3000);
      }
    }
  }, [currentStep, router, stopDemo]);

  // Handle manual navigation during demo
  useEffect(() => {
    if (!isActive) return;
    
    const timeoutMap: Record<DemoStep, number> = {
      idle: 0,
      landing: 4000,
      login: 3000,
      dashboard: 6000,
      inbox: 10000,
      automations: 5000,
      analytics: 7000,
      pricing: 6000,
      complete: 0
    };

    const timer = setTimeout(() => {
      if (isActive && currentStep !== 'complete') {
        nextStep();
      }
    }, timeoutMap[currentStep]);

    return () => clearTimeout(timer);
  }, [isActive, currentStep, nextStep]);

  return (
    <DemoContext.Provider value={{ isActive, currentStep, startDemo, stopDemo, nextStep }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
}
