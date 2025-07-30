import { useTransition } from 'react';

import { useLanguage } from '@/components/hooks/useLanguage';
import { useToast } from '@/components/hooks/useToast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useResendEmail } from '../../hooks/useResendEmail';
import { AuthService } from '../../services/authService';

interface Props {
  disable: boolean;
  resendCode: string;
  onExit?: () => void;
}

export default function ResendCard({ disable, resendCode, onExit }: Props) {
  const controller = new AbortController();
  const [isPending, startTransition] = useTransition();

  const { resendRegressiveTime, resendTimerExecute } = useResendEmail();
  const { translate } = useLanguage();
  const { toasInfo, toastWarning } = useToast();

  const handleResend = () => {
    startTransition(async () => {
      const result = await AuthService.resendConfirmationEmail(
        resendCode,
        controller
      );

      if (result.success) {
        toasInfo(translate('emailResend.success'));
      }

      if (result.errorCode === 'TOO_MANY_REQUESTS') {
        toastWarning(translate('emailResend.tooMany'));
      }

      resendTimerExecute();
    });
  };

  const handleExit = () => {
    controller.abort();
    onExit?.();
  };

  return (
    <>
      <Spinner
        loading={isPending}
        size='md'
        className='dark:bg-white bg-black absolute'
      />
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
