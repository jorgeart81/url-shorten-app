import { Suspense, type FC, type ReactNode } from 'react';

import { Spinner } from '@/components/ui/spinner';

interface Props {
  children: ReactNode | undefined;
}

export const AuthSuspense: FC<Props> = ({ children = undefined }) => {
  return (
    <Suspense
      fallback={
        <div className='relative w-screen h-dvh flex justify-center items-center'>
          <Spinner
            loading={true}
            size='md'
            className='dark:bg-white bg-black absolute'
          />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
