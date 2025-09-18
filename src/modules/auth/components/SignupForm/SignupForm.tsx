import { useActionState, useRef } from 'react';

import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';
import { z } from 'zod/v4';

import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import { useAuth } from '../../hooks/useAuth';
import { AuthFormButton } from '../AuthFormButton';
import {
  signupSchema,
  type SignupData,
  type SignupValidationError,
} from './signupValidation';

export const SignupForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const { error, signUp, onSubmit } = useAuth();
  const { translate } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const [stateValidation, formAction, isPending] = useActionState(
    async (_: unknown, queryData: FormData) => {
      const formData = Object.fromEntries(queryData) as SignupData;
      const result = signupSchema.safeParse(formData);

      if (!result.success && result.error) {
        const errors = z.treeifyError(result.error)
          .properties as SignupValidationError;
        return errors;
      }

      await signUp({
        email: formData.email,
        password: formData.password,
      });
      
      formRef.current?.reset();
    },
    null
  );
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='relative'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            {translate('registerForm.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            ref={formRef}
            onSubmit={(e) => onSubmit(e, formAction)}
          >
            <div className='grid gap-6'>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'></div>
              <div className='grid gap-6'>
                <div className='grid gap-3'>
                  <Label htmlFor='email'>
                    {translate('registerForm.input.emailLabel')}
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
                  <Label htmlFor='password'>
                    {translate('registerForm.input.passwordLabel')}
                  </Label>
                  <CustomInput
                    id='password'
                    name='password'
                    type='password'
                    hasError={stateValidation?.password != undefined}
                    errors={stateValidation?.password?.errors}
                    disabled={isPending}
                  />
                </div>

                <AuthFormButton
                  label={translate('registerForm.create')}
                  isPending={isPending}
                />
              </div>
              <div className='text-center text-sm'>
                {translate('registerForm.haveAccount')}
                <NavLink
                  to={RoutePath.Login}
                  viewTransition
                  className='underline underline-offset-4 ml-1'
                >
                  {translate('registerForm.login')}
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
};
