'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

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
  isDwelling: boolean;
  startDemo: () => void;
  stopDemo: () => void;
  nextStep: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const DEMO_TIMINGS: Record<DemoStep, number> = {
  idle: 0,
  landing: 5000,
  login: 4000,
  dashboard: 7000,
  inbox: 16000,
  automations: 9000,
  analytics: 8000,
  pricing: 6000,
  complete: 12000
};

const CURSOR_TARGETS: Record<DemoStep, CursorPos> = {
  idle: { x: 50, y: 50 },
  landing: { x: 55, y: 45 },    // Hero CTA
  login: { x: 50, y: 68 },      // Auth Button
  dashboard: { x: 88, y: 22 },  // Configure Workspace
  inbox: { x: 18, y: 42 },      // First Thread
  automations: { x: 78, y: 18 },// Create Automation
  analytics: { x: 82, y: 14 },  // Export Data
  pricing: { x: 50, y: 78 },    // Growth Plan CTA
  complete: { x: 50, y: 50 }
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<DemoStep>('idle');
  const [cursorPos, setCursorPos] = useState<CursorPos>({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const [isDwelling, setIsDwelling] = useState(false);
  const router = useRouter();
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopDemo = useCallback(() => {
    setIsActive(false);
    setCurrentStep('idle');
    setIsClicking(false);
    setIsDwelling(false);
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
      
      // Simulate Human Dwell (Observe the target before clicking)
      setIsDwelling(true);
      const randomDwell = 300 + Math.random() * 200;

      setTimeout(() => {
        setIsClicking(true);
        setIsDwelling(false);
        
        setTimeout(() => {
          setIsClicking(false);
          setCurrentStep(next);
          
          switch(next) {
            case 'login': router.push('/login'); break;
            case 'dashboard': router.push('/dashboard'); break;
            case 'inbox': router.push('/dashboard/inbox'); break;
            case 'automations': router.push('/dashboard/automations'); break;
            case 'analytics': router.push('/dashboard/analytics'); break;
            case 'pricing': router.push('/pricing'); break;
          }
        }, 300);
      }, randomDwell);
    }
  }, [currentStep, router]);

  useEffect(() => {
    if (!isActive) return;
    const moveTimer = setTimeout(() => {
      setCursorPos(CURSOR_TARGETS[currentStep]);
    }, 1000); 
    return () => clearTimeout(moveTimer);
  }, [currentStep, isActive]);

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
    <DemoContext.Provider value={{ isActive, currentStep, cursorPos, isClicking, isDwelling, startDemo, stopDemo, nextStep }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
}