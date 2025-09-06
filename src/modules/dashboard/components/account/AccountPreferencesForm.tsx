import { useActionState, useEffect, useState, type FC } from 'react';

import { CustomInput } from '@/components/form/CustomInput';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { UserAccount } from '../../store/types/userAccount';
import {
  updatePreferencesAction,
  type UpdatePreferencesState,
} from './updatePreferences.action';
import { BadgeCheckIcon, Loader2Icon } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { Badge } from '@/components/ui/badge';

interface Props {
  user: UserAccount;
}

export const AccountPreferencesForm: FC<Props> = ({ user }) => {
  const initialState: UpdatePreferencesState = { user, status: 'noChanges' };
  const { translate: t } = useLanguage();
  const [userName, setUserName] = useState(user.userName);

  const setUserAccount = useDashboardStore((state) => state.setUserAccount);

  const [updateState, formAction, isPending] = useActionState(
    updatePreferencesAction,
    initialState
  );
  const stateValidation = updateState.validationError;

  useEffect(() => {
    if (updateState.status === 'success') {
      setUserAccount({ ...updateState.user });
    }
  }, [updateState]);

  return (
    <div>
      <form action={formAction}>
        <div className='md:flex gap-3'>
          <div className='grid gap-3 flex-1'>
            <Label htmlFor='userName'>{t('userName')}</Label>
            <CustomInput
              id='userName'
              name='userName'
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              hasError={stateValidation?.userName != undefined}
              errors={stateValidation?.userName?.errors}
              disabled={isPending}
            />
          </div>
          <div className='grid gap-3 flex-1'>
            <Label htmlFor='email'>
              {t('email')}
              {user.emailConfirmed && (
                <Badge
                  variant='secondary'
                  className='bg-blue-500 text-white dark:bg-blue-600'
                >
                  <BadgeCheckIcon />
                  {t('verified')}
                </Badge>
              )}
            </Label>
            <CustomInput
              id='email'
              name='email'
              type='email'
              defaultValue={user.email}
              disabled
            />
          </div>
        </div>
        <Button
          type='submit'
          className='w-full md:w-fit mt-6'
          disabled={userName === user.userName || isPending}
        >
          {isPending && <Loader2Icon className='animate-spin' />}
          {t('update')}
        </Button>
      </form>
    </div>
  );
};
