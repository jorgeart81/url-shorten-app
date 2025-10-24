import { useRef, useTransition } from 'react';

import { useLanguage } from '@/components/hooks/useLanguage';
import { useToast } from '@/components/hooks/useToast';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useResendEmail } from '../../hooks/useResendEmail';
import { AuthService } from '../../services/authService';

interface Props {
  disable: boolean;
  resendCode: string;
  onExit?: () => void;
}

export default function ResendCard({ disable, resendCode, onExit }: Props) {
  const controllerRef = useRef<AbortController | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const { resendRegressiveTime, resendTimerExecute } = useResendEmail();
  const { translate } = useLanguage();
  const { toastInfo, toastWarning } = useToast();

  const handleResend = () => {
    controllerRef.current = new AbortController();
    startTransition(async () => {
      const result = await AuthService.resendConfirmationEmail(
        resendCode,
        controllerRef.current
      );

      if (result.success) {
        toastInfo(translate('emailResend.success'));
      }

      if (result.errorCode === 'TOO_MANY_REQUESTS') {
        toastWarning(translate('emailResend.tooMany'));
      }

      resendTimerExecute();
    });
  };

  const handleExit = () => {
    controllerRef.current?.abort();
    onExit?.();
  };

  return (
    <>
      <PendingSpinner loading={isPending} />

      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>{translate('emailResend.title')}</CardTitle>
          <CardDescription>
            {translate('emailResend.description')}{' '}
            {resendRegressiveTime <= 0 ? '' : `${resendRegressiveTime}s`}
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex-col gap-2 sm:flex-row sm:justify-end'>
          <Button
            variant='outline'
            className='w-full sm:w-fit'
            onClick={handleExit}
          >
            {translate('emailResend.buttonExit')}
          </Button>
          <Button
            onClick={handleResend}
            disabled={disable}
            className='w-full sm:w-fit'
          >
            {translate('emailResend.buttonSend')}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
