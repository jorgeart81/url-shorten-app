import { useActionState } from 'react';
import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';

import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import { AuthFormButton } from '../../AuthFormButton';
import type { RecoveryAccountState } from './recoveryAccount.action';
import { recoveryAccountAction } from './recoveryAccount.action';
import { useToast } from '@/components/hooks/useToast';
import { FormFooter } from '../../FormFooter';

export default function RecoveryAccountForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const initialState: RecoveryAccountState = { isSuccess: null };
  const { translate: t } = useLanguage();
  const { toastInfo } = useToast();

  const [recoveryState, formAction, isPending] = useActionState(
    recoveryAccountAction,
    initialState
  );
  const stateValidation = recoveryState.validationError;

  if (recoveryState.isSuccess) {
    toastInfo(t('emailResend.success'));
  }

  return (
    <div className={cn('max-w-sm flex flex-col gap-6', className)} {...props}>
      <Card className='relative'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            {t('forgotPasswordForm.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate action={formAction}>
            <div className='grid gap-6'>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'></div>
              <div className='grid gap-6'>
                <p>{t('forgotPasswordForm.message')}</p>
                <div className='grid gap-3'>
                  <Label htmlFor='email'>
                    {t('loginForm.input.emailLabel')}
                  </Label>
                  <CustomInput
                    id='email'
                    name='email'
                    type='email'
                    placeholder='miaccount@example.com'
                    hasError={stateValidation?.email != undefined}
                    errors={stateValidation?.email?.errors}
                    disabled={isPending}
                  />
                </div>

                <AuthFormButton
                  label={t('forgotPasswordForm.button')}
                  isPending={isPending}
                />
              </div>
              <div className='text-center text-sm'>
                <NavLink
                  to={RoutePath.Login}
                  viewTransition
                  className='underline underline-offset-4 ml-1'
                >
                  {t('return.to.login')}
                </NavLink>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {recoveryState.isSuccess != null && !recoveryState.isSuccess && (
        <ErrorAlert
          title={t('UNKNOWN.title')}
          description={t('UNKNOWN.description')}
        />
      )}

      <FormFooter />
    </div>
  );
}
