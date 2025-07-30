import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router';

import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { RoutePath } from '@/shared/constants/routePath';
import { useAuthStore } from '../store/authStore';
import { isValidUrlCode } from '@/utils/validateCode';

export const EmailConfirmation = () => {
  const controller = new AbortController();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const status = useAuthStore((state) => state.status);
  const confirmEmail = useAuthStore((state) => state.confirmEmail);
  const deleteState = useAuthStore((state) => state.deleteState);

  const handleConfirmation = async (code: string) => {
    const { isSuccess } = await confirmEmail(code, controller);

    if (isSuccess) {
      deleteState();
      setIsSuccess(true);
    }

    setIsLoading(false);
  };

  const goToAuth = () => {
    navigate(RoutePath.Login, { replace: true });
  };

  useEffect(() => {
    if (code) handleConfirmation(code);
  }, [code]);

  if (status === 'authenticated' || !isValidUrlCode(code, 100)) {
    return <Navigate to={RoutePath.Login} replace />;
  }

  if (isLoading)
    return (
      <div className='relative w-screen h-dvh flex justify-center items-center'>
        <Spinner
          loading={true}
          size='md'
          className='dark:bg-white bg-black absolute'
        />
      </div>
    );

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
};
