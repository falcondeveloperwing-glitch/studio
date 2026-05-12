'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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

interface CursorPos {
  x: number;
  y: number;
}

interface DemoContextType {
  isActive: boolean;
  currentStep: DemoStep;
  cursorPos: CursorPos;
  isClicking: boolean;
  startDemo: () => void;
  stopDemo: () => void;
  nextStep: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const DEMO_TIMINGS: Record<DemoStep, number> = {
  idle: 0,
  landing: 5000,
  login: 3500,
  dashboard: 6000,
  inbox: 14000,
  automations: 8000,
  analytics: 7000,
  pricing: 6000,
  complete: 10000
};

// Simulated human-like cursor targets (viewport percentages)
const CURSOR_TARGETS: Record<DemoStep, CursorPos> = {
  idle: { x: 50, y: 50 },
  landing: { x: 55, y: 48 }, // Hero CTA
  login: { x: 50, y: 65 },   // Sign in button
  dashboard: { x: 85, y: 25 }, // Configure workspace
  inbox: { x: 15, y: 45 },    // First conversation
  automations: { x: 75, y: 20 }, // Create automation
  analytics: { x: 80, y: 15 },   // Export button
  pricing: { x: 50, y: 75 },     // Growth plan CTA
  complete: { x: 50, y: 50 }
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<DemoStep>('idle');
  const [cursorPos, setCursorPos] = useState<CursorPos>({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const router = useRouter();
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopDemo = useCallback(() => {
    setIsActive(false);
    setCurrentStep('idle');
    setIsClicking(false);
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
  }, []);

  const startDemo = useCallback(() => {
    setIsActive(true);
    setCurrentStep('landing');
    setCursorPos({ x: 50, y: 50 });
    router.push('/');
  }, [router]);

  const nextStep = useCallback(() => {
    const steps: DemoStep[] = ['landing', 'login', 'dashboard', 'inbox', 'automations', 'analytics', 'pricing', 'complete'];
    const nextIdx = steps.indexOf(currentStep) + 1;
    
    if (nextIdx < steps.length) {
      const next = steps[nextIdx];
      
      // Simulate click before moving
      setIsClicking(true);
      
      setTimeout(() => {
        setIsClicking(false);
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
      }, 400);
    }
  }, [currentStep, router]);

  // Handle cursor movement
  useEffect(() => {
    if (!isActive) return;

    // Move cursor to target with a human-like delay
    const moveTimer = setTimeout(() => {
      setCursorPos(CURSOR_TARGETS[currentStep]);
    }, 800);

    return () => clearTimeout(moveTimer);
  }, [currentStep, isActive]);

  // Autoplay Logic
  useEffect(() => {
    if (!isActive || currentStep === 'complete') return;

    stepTimerRef.current = setTimeout(() => {
      nextStep();
    }, DEMO_TIMINGS[currentStep]);

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, [isActive, currentStep, nextStep]);

  return (
    <DemoContext.Provider value={{ isActive, currentStep, cursorPos, isClicking, startDemo, stopDemo, nextStep }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
}
