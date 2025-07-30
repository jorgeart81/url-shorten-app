import { lazy, Suspense } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { ResendEmailProvider } from './context/ResendEmailProvider';

const LazyResendingEmail = lazy(() => import('./ResendingEmail'));

export const ResendView = () => {
  return (
    <Suspense
      fallback={
        <div className='relative content-center size-full'>
          <Spinner
            loading={true}
            size='md'
            className='dark:bg-white bg-black absolute'
          />
        </div>
      }
    >
      <ResendEmailProvider>
        <LazyResendingEmail />
      </ResendEmailProvider>
      ;
    </Suspense>
  );
};
