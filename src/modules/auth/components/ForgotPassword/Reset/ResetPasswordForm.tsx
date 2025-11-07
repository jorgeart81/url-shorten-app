import { useActionState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { cn } from '@/lib/utils';

import { ErrorAlert } from '@/components/alerts/ErrorAlert';
import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import { AuthFormButton } from '../../AuthFormButton';
import type { ResetPasswordState } from './resetPassword.action';
import { resetPasswordAction } from './resetPassword.action';
import ResetPasswordDialog from './ResetSuccessDialog';

interface Props extends React.ComponentProps<'div'> {
  code: string;
}

export default function ResetPasswordForm({
  code,
  className,
  ...props
}: Props) {
  const initialState: ResetPasswordState = {
    isSuccess: null,
    code,
    isCodeExpired: false,
  };
  const navigate = useNavigate();
  const { translate: t } = useLanguage();

  const [recoveryState, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState
  );
  const stateValidation = recoveryState.validationError;

  if (recoveryState.isSuccess) {
    return (
      <ResetPasswordDialog
        title={t('passwordResetSuccess.title')}
        message={t('passwordResetSuccess.message')}
        buttonLabel={t('return.to.login')}
        onExit={() => navigate(RoutePath.Login, { viewTransition: true })}
      />
    );
  }

  if (recoveryState.isCodeExpired) {
    return (
      <ResetPasswordDialog
        title={t('passwordResetInvalidCode.title')}
        message={t('passwordResetInvalidCode.message')}
        buttonLabel={t('passwordResetInvalidCode.button')}
        onExit={() =>
          navigate(RoutePath.RecoveryAccount, { viewTransition: true })
        }
      />
    );
  }

  return (
    <div className={cn('max-w-sm flex flex-col gap-6', className)} {...props}>
      <Card className='relative'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            {t('resetPasswordForm.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form noValidate action={formAction}>
            <div className='grid gap-6'>
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'></div>
              <div className='grid gap-6'>
                <p>{t('resetPasswordForm.message')}</p>
                <div className='grid gap-3'>
                  <div className='flex items-center'>
                    <Label htmlFor='newPassword'>
                      {t('resetPasswordForm.passwordLabel')}
                    </Label>
                  </div>

                  <CustomInput
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    hasError={stateValidation?.newPassword != undefined}
                    errors={stateValidation?.newPassword?.errors}
                    disabled={isPending}
                  />
                </div>

                <div className='grid gap-3'>
                  <div className='flex items-center'>
                    <Label htmlFor='confirmPassword'>
                      {t('resetPasswordForm.confirmPasswordLabel')}
                    </Label>
                  </div>

                  <CustomInput
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    hasError={stateValidation?.confirmPassword != undefined}
                    errors={stateValidation?.confirmPassword?.errors}
                    disabled={isPending}
                  />
                </div>

                <AuthFormButton
                  label={t('resetPasswordForm.button')}
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

      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
