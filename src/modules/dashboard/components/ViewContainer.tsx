import React, { type FC } from 'react';

export const ViewContainer: FC<React.ComponentProps<'div'>> = ({
  children,
}) => {
  return (
    <div className='flex items-center flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='container min-h-full'>{children}</div>
    </div>
  );
};
