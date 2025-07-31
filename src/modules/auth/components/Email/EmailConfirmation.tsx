import { useEffect, useState, useTransition } from 'react';
import { useNavigate } from 'react-router';

import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RoutePath } from '@/shared/constants/routePath';
import { isValidUrlCode } from '@/utils/validateCode';
import { AuthService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  code: string;
}

export default function EmailConfirmation({ code }: Props) {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const deleteState = useAuthStore((state) => state.deleteState);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!code || !isValidUrlCode(code, 100)) {
      return;
    }
    // Confirm email when the component mounts
    startTransition(async () => {
      const { success } = await AuthService.confirmEmail(code);
      setIsSuccess(success);
    });
  }, []);

  const goToAuth = () => {
    navigate(RoutePath.Login, { replace: true });
  };

  if (isPending)
    return (
      <div className='relative w-screen h-dvh flex justify-center items-center'>
        <Spinner
          loading={true}
          size='md'
          className='dark:bg-white bg-black absolute'
        />
      </div>
    );

  if (isSuccess) {
    deleteState();
  }

  return (
    <div className='relative  w-screen h-dvh flex justify-center items-center'>
      {isSuccess ? (
        <Card className='w-full max-w-sm'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>
              {translate('emailVerification.successTitle')}
            </CardTitle>
            <CardDescription className='text-muted-foreground'>
              {translate('emailVerification.successDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='mt-4 text-center'>
            <p> {translate('emailVerification.successActionMessage')}</p>
            <Button className='mt-4' onClick={goToAuth}>
              {translate('emailVerification.successActionButton')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className='w-full max-w-sm'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>
              ⚠️ {translate('emailVerification.errorTitle')}
            </CardTitle>
            <CardDescription className='text-muted-foreground'>
              {translate('emailVerification.errorDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='mt-4 text-center'>
            <p>{translate('emailVerification.errorHelp')}</p>
            <Button className='mt-4' onClick={goToAuth}>
              {translate('emailVerification.errorAction')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
