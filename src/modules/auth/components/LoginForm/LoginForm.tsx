import { useActionState, useRef } from 'react';

import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';

import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import { useAuth } from '../../hooks/useAuth';
import { AuthFormButton } from '../AuthFormButton';
import { FormFooter } from '../FormFooter';
import { authenticate } from './action';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const formRef = useRef<HTMLFormElement>(null);
  const { error } = useAuth();
  const { translate } = useLanguage();

  const [formState, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='relative'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            {translate('loginForm.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate ref={formRef} action={formAction}>
            <div className='grid gap-6'>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'></div>
              <div className='grid gap-6'>
                <div className='grid gap-3'>
                  <Label htmlFor='email'>
                    {translate('loginForm.input.emailLabel')}
                  </Label>
                  <CustomInput
                    id='email'
                    name='email'
                    type='email'
                    placeholder='miaccount@example.com'
                    defaultValue={formState?.data?.email}
                    hasError={formState?.fieldErrors?.email != undefined}
                    errors={formState?.fieldErrors?.email}
                    disabled={isPending}
                  />
                </div>
                <div className='grid gap-3'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>
                      {translate('loginForm.input.passwordLabel')}
                    </Label>
                    <NavLink
                      to={RoutePath.RecoveryAccount}
                      viewTransition
                      className='ml-auto text-sm underline-offset-4 hover:underline'
                    >
                      {translate('loginForm.forgotPassword')}
                    </NavLink>
                  </div>

                  <CustomInput
                    id='password'
                    name='password'
                    type='password'
                    hasError={formState?.fieldErrors?.password != undefined}
                    errors={formState?.fieldErrors?.password}
                    disabled={isPending}
                  />
                </div>
                <div className='flex items-start gap-3'>
                  <Checkbox
                    id='keepLoggedIn'
                    name='keepLoggedIn'
                    disabled={isPending}
                  />
                  <div className='grid gap-2'>
                    <Label htmlFor='keepLoggedIn'>
                      {translate('loginForm.rememberMe')}
                    </Label>
                  </div>
                </div>
                <AuthFormButton
                  label={translate('loginForm.login')}
                  isPending={isPending}
                />
              </div>
              <div className='text-center text-sm'>
                {translate('loginForm.dontHaveAccount')}
                <NavLink
                  to={RoutePath.Signup}
                  viewTransition
                  className='underline underline-offset-4 ml-1'
                >
                  {translate('loginForm.signUp')}
                </NavLink>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && <ErrorAlert title={error.title} description={error.message} />}

      <FormFooter />
    </div>
  );
}
