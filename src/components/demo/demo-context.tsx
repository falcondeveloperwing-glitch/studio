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

const DEMO_TIMINGS: Record<DemoStep, number> = {
  idle: 0,
  landing: 4500,
  login: 3000,
  dashboard: 7000,
  inbox: 12000,
  automations: 8000,
  analytics: 8000,
  pricing: 6000,
  complete: 10000
};

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
      
      // Navigation Dispatcher
      switch(next) {
        case 'login': router.push('/login'); break;
        case 'dashboard': router.push('/dashboard'); break;
        case 'inbox': router.push('/dashboard/inbox'); break;
        case 'automations': router.push('/dashboard/automations'); break;
        case 'analytics': router.push('/dashboard/analytics'); break;
        case 'pricing': router.push('/pricing'); break;
      }
    }
  }, [currentStep, router]);

  // Autoplay Logic
  useEffect(() => {
    if (!isActive || currentStep === 'complete') return;

    const timer = setTimeout(() => {
      nextStep();
    }, DEMO_TIMINGS[currentStep]);

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
