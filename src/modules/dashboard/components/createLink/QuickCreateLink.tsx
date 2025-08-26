import { useActionState, useEffect, type FC } from 'react';

import { Navigate } from 'react-router';

import { CustomInput } from '@/components/form/CustomInput';
import { EditableField } from '@/components/form/EditableField';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { env } from '@/config/env';
import { Label } from '@radix-ui/react-label';
import { createLinkAction } from './createLink.action';
import { type CreateLinkValidationError } from './createLinkValidation';

export interface CreateState {
  goTo?: string;
  validationError?: CreateLinkValidationError;
}

interface Props {
  onPendingChange?: (pending: boolean) => void;
}

export const QuickCreateLink: FC<Props> = ({ onPendingChange }) => {
  const domain = env.redirectionDomain;
  const initialState: CreateState = {};

  const { translate: t } = useLanguage();

  const [createState, formAction, isPending] = useActionState(
    createLinkAction,
    initialState
  );

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  const stateValidation = createState.validationError;

  if (createState.goTo) return <Navigate to={createState.goTo} />;

  return (
    <Card className='w-full'>
      <CardContent>
        <div className='mb-4'>
          <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            {t('quick.create')}
          </h3>
        </div>
        <form noValidate action={formAction}>
          <div className='grid gap-6'>
            <input
              type='hidden'
              id='domain'
              name='domain'
              value={domain}
              readOnly
            />
            <EditableField
              name='domain'
              label={t('createLink.form.label.domain')}
              value={domain}
              disabled={isPending}
            />
            <div className='grid gap-3'>
              <Label htmlFor='destination'>
                {t('createLink.form.label.destination')}
              </Label>
              <div className='flex flex-col md:flex-row gap-4'>
                <CustomInput
                  id='destination'
                  name='destination'
                  type='text'
                  placeholder='https://example.com/my-long-url'
                  hasError={stateValidation?.destination != undefined}
                  errors={stateValidation?.destination?.errors}
                  disabled={isPending}
                />
                <Button type='submit' className='w-full md:w-fit'>
                  {t('createLink.button.create')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
