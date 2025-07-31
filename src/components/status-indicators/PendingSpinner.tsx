import type React from 'react';
import { Spinner } from '../ui/spinner';

interface Props extends React.ComponentProps<'div'> {
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PendingSpinner = ({
  loading = true,
  size = 'md',
  ...props
}: Props) => {
  return (
    <div {...props}>
      <Spinner
        loading={loading}
        size={size}
        className='dark:bg-white bg-black absolute'
      />
    </div>
  );
};
