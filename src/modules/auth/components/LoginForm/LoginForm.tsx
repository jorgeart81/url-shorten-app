import { useActionState, useRef } from 'react';

import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';
import { z } from 'zod/v4';

import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import { getClientFingerprint } from '@/utils/getPlatform';
import { useAuth } from '../../hooks/useAuth';
import { AuthFormButton } from '../AuthFormButton';
import {
  loginSchema,
  type LoginData,
  type LoginValidationError,
} from './loginValidationSchema';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const fromRef = useRef<HTMLFormElement>(null);
  const { error, login, onSubmit } = useAuth();
  const { translate } = useLanguage();

  const [stateValidation, formAction, isPending] = useActionState(
    async (_: unknown, queryData: FormData) => {
      const formData = Object.fromEntries(queryData) as LoginData;
      const result = loginSchema.safeParse(formData);

      if (!result.success && result.error) {
        const errors = z.treeifyError(result.error)
          .properties as LoginValidationError;
        return errors;
      }

      const { platform, language, cores } = getClientFingerprint();

      const { isSuccess } = await login({
        email: formData.email,
        password: formData.password,
        deviceName: `${platform}/${language}/${cores}`,
        clientType: 'web',
        keepLoggedIn: formData.keepLoggedIn == 'on',
      });

      if (isSuccess) fromRef.current?.reset();
    },
    null
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
          <form
            noValidate
            ref={fromRef}
            onSubmit={(e) => onSubmit(e, formAction)}
          >
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
                    placeholder='m@example.com'
                    hasError={stateValidation?.email != undefined}
                    errors={stateValidation?.email?.errors}
                    disabled={isPending}
                  />
                </div>
                <div className='grid gap-3'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>
                      {translate('loginForm.input.passwordLabel')}
                    </Label>
                    <NavLink
                      to={'#'}
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
                    hasError={stateValidation?.password != undefined}
                    errors={stateValidation?.password?.errors}
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

      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
