'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_USERS } from '@/lib/mock-users';

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
  isDemoMode: boolean;
  demoUser: any | null;
  currentStep: DemoStep;
  cursorPos: CursorPos;
  isClicking: boolean;
  isDwelling: boolean;
  startDemo: () => void;
  stopDemo: () => void;
  nextStep: () => void;
  setDemoMode: (active: boolean) => void;
  switchDemoRole: (role: 'admin' | 'manager' | 'agent') => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const DEMO_TIMINGS: Record<DemoStep, number> = {
  idle: 0,
  landing: 6000,
  login: 5000,
  dashboard: 8000,
  inbox: 18000,
  automations: 12000,
  analytics: 9000,
  pricing: 7000,
  complete: 15000
};

const CURSOR_TARGETS: Record<DemoStep, CursorPos> = {
  idle: { x: 50, y: 50 },
  landing: { x: 58, y: 42 },
  login: { x: 50, y: 72 },
  dashboard: { x: 92, y: 18 },
  inbox: { x: 22, y: 48 },
  automations: { x: 74, y: 22 },
  analytics: { x: 80, y: 12 },
  pricing: { x: 50, y: 82 },
  complete: { x: 50, y: 50 }
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoUser, setDemoUser] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<DemoStep>('idle');
  const [cursorPos, setCursorPos] = useState<CursorPos>({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const [isDwelling, setIsDwelling] = useState(false);
  const router = useRouter();
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('rr_demo_mode');
    const savedUser = localStorage.getItem('rr_demo_user');
    const isMockConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-key' || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    
    if (saved === 'true' || isMockConfig) {
      setIsDemoMode(true);
      if (savedUser) setDemoUser(JSON.parse(savedUser));
    }
  }, []);

  const setDemoMode = (active: boolean) => {
    setIsDemoMode(active);
    localStorage.setItem('rr_demo_mode', active ? 'true' : 'false');
    if (!active) {
      setDemoUser(null);
      localStorage.removeItem('rr_demo_user');
    }
  };

  const switchDemoRole = (role: 'admin' | 'manager' | 'agent') => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      const demoUserData = {
        uid: `demo_${role}`,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.avatar,
        role: user.role,
        brandName: 'Demo Brand',
        isDemo: true
      };
      setDemoUser(demoUserData);
      localStorage.setItem('rr_demo_user', JSON.stringify(demoUserData));
      setDemoMode(true);
    }
  };

  const stopDemo = useCallback(() => {
    setIsActive(false);
    setCurrentStep('idle');
    setIsClicking(false);
    setIsDwelling(false);
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    router.push('/');
  }, [router]);

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
      setIsDwelling(true);
      
      // Simulate "thinking" or reading time
      const dwellTime = 800 + Math.random() * 600;

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
            case 'complete': break;
          }
        }, 300);
      }, dwellTime);
    }
  }, [currentStep, router]);

  useEffect(() => {
    if (!isActive) return;
    
    // Add human-like hesitation before movement
    const moveTimer = setTimeout(() => {
      setCursorPos(CURSOR_TARGETS[currentStep]);
    }, 1400);
    
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
    <DemoContext.Provider value={{ 
      isActive, 
      isDemoMode, 
      demoUser, 
      currentStep, 
      cursorPos, 
      isClicking, 
      isDwelling, 
      startDemo, 
      stopDemo, 
      nextStep, 
      setDemoMode, 
      switchDemoRole 
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
}
