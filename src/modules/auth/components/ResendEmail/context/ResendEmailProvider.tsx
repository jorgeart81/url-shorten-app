import { useEffect, useState, type JSX } from 'react';

import { CookieKey } from '@/shared/constants/cookieKey';
import { ElapsedCounter } from '@/utils/elapsedCounter';
import { ResendEmailContext } from './resendEmailContext';
import { useAuthStore } from '@/modules/auth/store/authStore';

export const ResendEmailProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const sessionCounterMaxSeconds = 600;
  const resendCounterMaxSeconds = 60;

  const sessionCounter = new ElapsedCounter(
    CookieKey.EmailResendSession,
    sessionCounterMaxSeconds
  );
  const resendCounter = new ElapsedCounter(
    CookieKey.EmailResend,
    resendCounterMaxSeconds
  );

  const [sessionElapsedTime, setSessionElapsedTime] = useState(0);
  const [sessionRegressiveTime, setSessionRegressiveTime] = useState(0);
  const [resedElapsedTime, setResendElapsedTime] = useState(0);
  const [resendRegressiveTime, setResendRegressiveTime] = useState(0);
  const status = useAuthStore((state) => state.status);

  const sessionExecute = ({ reload = false }: { reload?: boolean } = {}) => {
    sessionCounter.startTimer({
      regressiveTime: (time) => setSessionRegressiveTime(time),
      elapsedTime: (time) => setSessionElapsedTime(time),
      reload: reload,
    });
  };

  const resendExecute = ({ reload = false }: { reload?: boolean } = {}) => {
    resendCounter.startTimer({
      regressiveTime: (time) => setResendRegressiveTime(time),
      elapsedTime: (time) => setResendElapsedTime(time),
      reload: reload,
    });
  };

  const sessionReset = () => {
    sessionCounter.resetTimer();
  };

  const redendReset = () => {
    resendCounter.resetTimer();
  };

  useEffect(() => {
    sessionExecute({ reload: true });
    resendExecute({ reload: true });
    return () => {
      if (status !== 'unconfirmedEmail') {
        sessionReset();
        resendCounter.cancelTimer();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResendEmailContext
      value={{
        sessionElapsedTime,
        sessionRegressiveTime,
        resedElapsedTime,
        resendRegressiveTime,
        sessionTimerExecute: sessionExecute,
        resendTimerExecute: resendExecute,
        sessionTimerReset: sessionReset,
        resendTimerReset: redendReset,
      }}
    >
      {children}
    </ResendEmailContext>
  );
};
