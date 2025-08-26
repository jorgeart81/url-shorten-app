import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props extends React.ComponentProps<'div'> {
  domain: string;
  hidden?: boolean;
}

export const LinkCardImage: FC<Props> = ({
  domain,
  hidden = false,
  className,
}) => {
  return (
    <div
      className={twMerge(clsx('hidden', { 'sm:block': !hidden }), className)}
    >
      <div className='flex justify-center items-center p-1.5 bg-white size-11 rounded-full overflow-clip'>
        <img
          className='rounded-full'
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
          alt='image'
        />
      </div>
    </div>
  );
};
