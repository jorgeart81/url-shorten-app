import { useActionState, useEffect, type FC, type Ref } from 'react';

import { EditableField } from '@/components/form/EditableField';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Separator } from '@/components/ui/separator';
import { CornerDownRight, Pencil } from 'lucide-react';

import type { Link } from '../../store/types/link';
import { updateLinkAction } from './updateLink.action';
import {
  type UpdateLinkValidationError
} from './updateLinkValidation';

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
  console.log({ updateState });
  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

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
      />
    </form>
  );
};
