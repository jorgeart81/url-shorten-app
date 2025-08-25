import type { ComponentProps, FC } from 'react';

import { Link, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useLanguage } from '@/components/hooks/useLanguage';
import { RoutePath } from '@/shared/constants/routePath';

export const NoLinksContent: FC<ComponentProps<'div'>> = ({ className }) => {
  const { translate: t } = useLanguage();
  const [searchParams] = useSearchParams();
  const archived = searchParams.get('archived');

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
          to={archived === 'on' ? RoutePath.Links : { search: '?archived=on' }}
          className='ml-auto underline-offset-4 underline dark:text-gray-300 cursor-pointer'
        >
          {archived === 'on'
            ? t('linksView.noResults.activeLink')
            : t('linksView.noResults.hiddenLink')}
        </Link>
        {t('linksView.noResults.description').split('{{hiddenLink}}')[1]}
      </p>
    </div>
  );
};
