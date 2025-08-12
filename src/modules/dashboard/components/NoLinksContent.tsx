import { Link } from 'react-router';

import { useLanguage } from '@/components/hooks/useLanguage';
import type { ComponentProps, FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const NoLinksContent: FC<ComponentProps<'div'>> = ({ className }) => {
  const { translate: t } = useLanguage();
  return (
    <div
      className={twMerge(
        'text-center text-muted-foreground my-auto',
        className
      )}
    >
      <h3 className='text-lg font-semibold mb-2'>
        {t('linksView.noResults.title')}
      </h3>

      <p>
        {t('linksView.noResults.description').split('{{hiddenLink}}')[0]}
        <br />
        <Link
          to={{ search: '?archived=on' }}
          className='ml-auto underline-offset-4 underline dark:text-gray-300'
        >
          {t('linksView.noResults.hiddenLink')}
        </Link>
        {t('linksView.noResults.description').split('{{hiddenLink}}')[1]}
      </p>
    </div>
  );
};
