import { useActionState } from 'react';
import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';

import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import { AuthFormButton } from '../AuthFormButton';
import type { RecoveryAccountState } from './recoveryAccount.action';
import { recoveryAccountAction } from './recoveryAccount.action';

export default function RecoveryAccountForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { translate } = useLanguage();

  const initialState: RecoveryAccountState = { isSuccess: false };

  const [recoveryState, formAction, isPending] = useActionState(
    recoveryAccountAction,
    initialState
  );

  const stateValidation = recoveryState.validationError;

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className={cn('max-w-sm flex flex-col gap-6', className)} {...props}>
        <Card className='relative'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>
              {translate('forgotPasswordForm.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form noValidate action={formAction}>
              <div className='grid gap-6'>
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'></div>
                <div className='grid gap-6'>
                  <p>{translate('forgotPasswordForm.message')}</p>
                  <div className='grid gap-3'>
                    <Label htmlFor='email'>
                      {translate('loginForm.input.emailLabel')}
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
                    label={translate('forgotPasswordForm.button')}
                    isPending={isPending}
                  />
                </div>
                <div className='text-center text-sm'>
                  <NavLink
                    to={RoutePath.Login}
                    viewTransition
                    className='underline underline-offset-4 ml-1'
                  >
                    {translate('return.to.login')}
                  </NavLink>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* {error && <ErrorAlert title={error.title} description={error.message} />} */}

        <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
          By clicking continue, you agree to our{' '}
          <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
