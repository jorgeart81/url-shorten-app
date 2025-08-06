import type React from 'react';
import { Spinner } from '../ui/spinner';
import clsx from 'clsx';

interface Props extends React.ComponentProps<'div'> {
  fullScreen?: boolean;
  fullSize?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PendingSpinner = ({
  fullScreen,
  fullSize,
  loading = true,
  size = 'md',
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={clsx(props.className, {
        'relative w-screen h-dvh flex justify-center items-center': fullScreen,
        'size-full flex justify-center items-center': fullSize,
      })}
    >
      <Spinner
        loading={loading}
        size={size}
        className='dark:bg-white bg-black absolute'
      />
    </div>
  );
};
