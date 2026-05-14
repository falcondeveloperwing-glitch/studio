'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

/**
 * @fileOverview A global listener that surfaces FirestorePermissionErrors
 * to the Next.js development overlay for rapid debugging.
 */
export function FirebaseErrorListener() {
  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (error) => {
      // Re-throwing the error here ensures it is caught by the Next.js
      // development error overlay, providing rich context for fixing rules.
      throw error;
    });

    return () => unsubscribe();
  }, []);

  return null;
}
