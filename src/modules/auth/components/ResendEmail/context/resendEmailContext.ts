import { createContext } from 'react';

interface ContextState {
  sessionElapsedTime: number;
  sessionRegressiveTime: number;
  resedElapsedTime: number;
  resendRegressiveTime: number;
  sessionTimerExecute: () => void;
  sessionTimerReset: () => void;
  resendTimerExecute: () => void;
  resendTimerReset: () => void;
}

export const ResendEmailContext = createContext({} as ContextState);
