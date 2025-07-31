import type React from 'react';
import { Spinner } from '../ui/spinner';
import clsx from 'clsx';

interface Props extends React.ComponentProps<'div'> {
  fullScreen?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PendingSpinner = ({
  fullScreen,
  loading = true,
  size = 'md',
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={clsx(props.className, {
        'relative w-screen h-dvh flex justify-center items-center': fullScreen,
      })}
    >
      <Spinner
        loading={loading}
        size={size}
        className="dark:bg-white bg-black absolute"
      />
    </div>
  );
};
