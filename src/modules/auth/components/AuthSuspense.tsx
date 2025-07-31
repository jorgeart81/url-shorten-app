import { Suspense, type FC, type ReactNode } from 'react';

import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';

interface Props {
  children: ReactNode | undefined;
}

export const AuthSuspense: FC<Props> = ({ children = undefined }) => {
  return (
    <Suspense
      fallback={
        <PendingSpinner fullScreen />
      }
    >
      {children}
    </Suspense>
  );
};
