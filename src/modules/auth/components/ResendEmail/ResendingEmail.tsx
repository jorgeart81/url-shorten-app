import { useEffect, useState } from 'react';

import { useLanguage } from '@/components/hooks/useLanguage';
import { useToast } from '@/components/hooks/useToast';
import type { ResultErrorCode } from '@/config/rop/resultErrorCode';
import { useResendEmail } from '../../hooks/useResendEmail';
import { AuthService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import ResendCard from './ResendCard';
import ResendEmailDialog from './ResendEmailDialog';

const controller = new AbortController();

export default function ResendingEmail() {
  const [endSession, setEndSession] = useState(false);
  const [codeError, setCodeError] = useState<ResultErrorCode>();

  const { translate } = useLanguage();
  const { toasInfo, toastWarning } = useToast();
  const {
    resendRegressiveTime,
    sessionRegressiveTime,
    sessionTimerExecute,
    sessionTimerReset,
    resendTimerExecute,
    resendTimerReset,
  } = useResendEmail();

  const status = useAuthStore((state) => state.status);
  const resendCode = useAuthStore((state) => state.resendCode);
  const deleteState = useAuthStore((state) => state.deleteState);
  const sessionExpired = useAuthStore((state) => state.sessionExpired);

  const validateCode = async (controller: AbortController, code: string) => {
    const { errorCode } = await AuthService.validateResendCode(
      code,
      controller
    );

    if (errorCode) handleError(errorCode);
  };

  const handleExitExpiredSession = () => {
    controller.abort();
    sessionTimerReset();
    resendTimerReset();
    deleteState();
  };

  function handleError(code: ResultErrorCode) {
    setCodeError(code);

    if (code === 'TOO_MANY_REQUESTS') {
      toastWarning(translate('TOO_MANY_REQUESTS.description'));
      resendTimerExecute();
      return;
    }

    if (code === 'NETWORK_ERROR') {
      toasInfo(translate('NETWORK_ERROR.description'));
      return;
    }

    if (code === 'RESENCODE_EXPIRED') {
      sessionExpired();
      toasInfo(translate('RESENCODE_EXPIRED.description'));
      sessionTimerReset();
      return;
    }

    toastWarning(translate('UNKNOWN.description'));
  }
  console.log({ sessionRegressiveTime });
  useEffect(() => {
    if (sessionRegressiveTime === 1 && status !== 'sessionExpired') {
      sessionExpired();
      setEndSession(true);
      toasInfo(translate('RESENCODE_EXPIRED.description'));
      return;
    }

    if (sessionRegressiveTime === 60) {
      toastWarning(translate('sessionExpirationWarning'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, sessionRegressiveTime]);

  useEffect(() => {
    if (endSession || !resendCode) return;
    if (status === 'sessionExpired') {
      setEndSession(true);
      toasInfo(translate('RESENCODE_EXPIRED.description'));
      return;
    }

    validateCode(controller, resendCode);
    sessionTimerExecute();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, resendCode, endSession]);

  useEffect(() => {
    if (resendRegressiveTime <= 0) {
      setCodeError(undefined);
    }
  }, [resendRegressiveTime]);

  return (
    <>
      {endSession || !resendCode ? (
        <ResendEmailDialog onExit={handleExitExpiredSession} />
      ) : (
        <div className='w-dvw h-dvh flex flex-col items-center justify-center'>
          <ResendCard
            disable={endSession || resendRegressiveTime > 0 || !!codeError}
            resendCode={resendCode}
            onExit={handleExitExpiredSession}
          />
        </div>
      )}
    </>
  );
}
