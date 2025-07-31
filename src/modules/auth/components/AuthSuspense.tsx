import { Suspense, type FC, type ReactNode } from 'react';

import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';

interface Props {
  children: ReactNode | undefined;
}

export const AuthSuspense: FC<Props> = ({ children = undefined }) => {
  return (
    <Suspense
      fallback={
        <PendingSpinner className='relative w-screen h-dvh flex justify-center items-center' />
      }
    >
      {children}
    </Suspense>
  );
};
