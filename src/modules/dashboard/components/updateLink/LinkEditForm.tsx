import { useActionState, useEffect, type FC, type Ref } from 'react';

import { EditableField } from '@/components/form/EditableField';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Separator } from '@/components/ui/separator';
import { CornerDownRight, Pencil } from 'lucide-react';

import type { Link } from '../../store/types/link';
import {
  updateLinkSchema,
  type UpdateLinkValidationError,
} from './updateLinkValidation';
import type { JsonPatchOperation } from '@/config/types/jsonPatchDocument';
import { z } from 'zod/v4';

interface Props {
  link: Link;
  ref: Ref<HTMLFormElement>;
  onPendingChange?: (pending: boolean) => void;
}

export const LinkEditForm: FC<Props> = ({ link, ref, onPendingChange }) => {
  const { backHalf, destination, domain, title } = link;

  const { translate: t } = useLanguage();

  const [stateValidation, formAction, isPending] = useActionState(
    async (_: unknown, queryData: FormData) => {
      const formData = Object.fromEntries(queryData);

      const validationResult = updateLinkSchema.safeParse(formData);

      if (validationResult.success) {
        const patchOperations: JsonPatchOperation[] = Object.entries(
          formData
        ).map(([key, value]) => ({
          op: 'replace',
          path: `/${key}`,
          value,
        }));

        console.log(patchOperations);
        return null;
      }

      if (validationResult.error) {
        const errors = z.treeifyError(validationResult.error)
          .properties as UpdateLinkValidationError;
        return errors;
      }

      console.log({ formData, validationResult });
      // if (isSuccess) fromRef.current?.reset();
    },
    null
  );

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
