import { useState, type FC, type Ref } from 'react';

import { CustomInput } from '@/components/form/CustomInput';
import { EditableField } from '@/components/form/EditableField';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Separator } from '@/components/ui/separator';
import { CornerDownRight, Pencil } from 'lucide-react';

import type { Link } from '../store/types/link';

interface Props {
  link: Link;
  ref: Ref<HTMLFormElement>;
}

export const LinkEditForm: FC<Props> = ({ link, ref }) => {
  const { backHalf, destination, domain } = link;
  const shortLink = `${domain}/${backHalf}`;

  const { translate: t } = useLanguage();
  const [title, setTitle] = useState(link.title);

  return (
    <form ref={ref} className='flex flex-col gap-y-6'>
      <EditableField
        name='backHalf'
        label={t('shortlink')}
        buttonTitle={`${t('edit')}`}
        buttonAriaLabel={`${t('edit')} link`}
        icon={<Pencil />}
        buttonText={t('edit')}
        value={shortLink}
      />

      <EditableField
        name='destination'
        label={t('destinationURL')}
        buttonTitle={`${t('edit')} ${t('destinationURL')}`}
        buttonAriaLabel={`${t('edit')} ${t('destinationURL')}`}
        icon={<CornerDownRight />}
        buttonText={t('redirect')}
        value={destination}
      />

      <Separator className='my-2' />

      <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
        {t('optionalDetails')}
      </h4>
      <div>
        <label
          htmlFor='title'
          className='scroll-m-20 font-semibold tracking-tight'
        >
          {t('title')}
        </label>
        <CustomInput
          id='title'
          name='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='mt-2'
        />
      </div>
    </form>
  );
};
