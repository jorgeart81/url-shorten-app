import { Navigate, useParams } from 'react-router';

import { RoutePath } from '@/shared/constants/routePath';
import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { Separator } from '@/components/ui/separator';

export const LinkEditView = () => {
  const { translate: t } = useLanguage();
  const { backHalf } = useParams();
  if (!backHalf) return <Navigate to={RoutePath.Links} />;

  return (
    <ViewContainer>
      <Head title={t('links')} />
      <ViewHeader title={`${t('edit')} ${t('link').toLocaleLowerCase()}`} />

      <section>
        <div>
          <label className='scroll-m-20 font-semibold tracking-tight'>
            {t('shortlink')}
          </label>
        </div>

        <div>
          <label className='scroll-m-20 font-semibold tracking-tight'>
            {t('destinationURL')}
          </label>
        </div>

        <Separator className='my-4' />
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
          {t('optionalDetails')}
        </h4>
        <div>
          <label className='scroll-m-20 font-semibold tracking-tight'>
            {t('title')}
          </label>
        </div>
      </section>
    </ViewContainer>
  );
};
