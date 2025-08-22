import { useActionState, useEffect, type FC, type Ref } from 'react';
import { Navigate } from 'react-router';

import { EditableField } from '@/components/form/EditableField';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Separator } from '@/components/ui/separator';
import { CornerDownRight, Pencil } from 'lucide-react';

import { RoutePath } from '@/shared/constants/routePath';
import { updateLinkAction } from './updateLink.action';

import type { Link } from '../../store/types/link';
import { type UpdateLinkValidationError } from './updateLinkValidation';

export type UpdateStatus = 'noChanges' | 'success' | 'fail';
export interface UpdateState {
  link: Link;
  status: UpdateStatus;
  validationError?: UpdateLinkValidationError;
}

interface Props {
  link: Link;
  ref: Ref<HTMLFormElement>;
  onPendingChange?: (pending: boolean) => void;
}

export const LinkEditForm: FC<Props> = ({ link, ref, onPendingChange }) => {
  const initialState: UpdateState = { link, status: 'noChanges' };
  const { backHalf, destination, domain, title } = link;

  const { translate: t } = useLanguage();

  const [updateState, formAction, isPending] = useActionState(
    updateLinkAction,
    initialState
  );

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  if (updateState.status === 'success')
    return <Navigate to={`${RoutePath.Links}/${link.backHalf}/details`} />;

  return (
    <form action={formAction} ref={ref} className='flex flex-col gap-y-6'>
      <div>
        <EditableField
          name='backHalf'
          label={t('shortlink')}
          icon={<Pencil />}
          inputPrefix={`${domain}/`}
          value={backHalf}
          disabled={isPending}
        />
      </div>

      <EditableField
        name='destination'
        label={t('destinationURL')}
        buttonTitle={t('change.destination.url')}
        buttonAriaLabel={`${t('edit')} ${t('destinationURL')}`}
        icon={<CornerDownRight />}
        buttonText={t('redirect')}
        value={destination}
        disabled={isPending}
        errors={updateState.validationError?.destination?.errors}
      />

      <Separator className='my-2' />

      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
        {t('optionalDetails')}
      </h4>
      <EditableField
        name='title'
        label={t('title')}
        value={title}
        disabled={isPending}
        showInput
        errors={updateState.validationError?.title?.errors}
      />
    </form>
  );
};
