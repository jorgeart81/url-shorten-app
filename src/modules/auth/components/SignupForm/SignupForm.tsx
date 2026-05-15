import { useActionState } from 'react';
import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';

import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import { useAuth } from '../../hooks/useAuth';
import { AuthFormButton } from '../AuthFormButton';
import { FormFooter } from '../FormFooter';
import { register } from './action';

export const SignupForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const { error } = useAuth();
  const { translate } = useLanguage();

  const [formState, formAction, isPending] = useActionState(
    register,
    undefined
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
          <form noValidate action={formAction}>
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
                    placeholder='miaccount@example.com'
                    defaultValue={formState?.data?.email}
                    hasError={formState?.fieldErrors?.email != undefined}
                    errors={formState?.fieldErrors?.email}
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
                    hasError={formState?.fieldErrors?.password != undefined}
                    errors={formState?.fieldErrors?.password}
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

      <FormFooter />
    </div>
  );
};
