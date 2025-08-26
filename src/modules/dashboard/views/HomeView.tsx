import { useState } from 'react';

import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { QuickCreateLink } from '../components/createLink/QuickCreateLink';

export const HomeView = () => {
  const { translate: t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <PendingSpinner fullSize className='absolute z-20' />}
      <ViewContainer>
        <Head title={t('home')} />
        <div className='flex flex-col items-center'>
          <div className='w-full max-w-3xl'>
            <ViewHeader title={t('yourPlatform')} />

            <section className='relative flex flex-col items-center py-6'>
              <QuickCreateLink onPendingChange={setIsLoading} />
            </section>
          </div>
        </div>
      </ViewContainer>
    </>
  );
};
