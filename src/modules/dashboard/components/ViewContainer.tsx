import React, { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const ViewContainer: FC<React.ComponentProps<'div'>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={twMerge(
        'flex items-center flex-1 flex-col gap-4 p-4 pt-0',
        className
      )}
    >
      <div className='container min-h-full md:px-10 lg:px-16'>{children}</div>
    </div>
  );
};
