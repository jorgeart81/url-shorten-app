import React from 'react';
import { Input } from '../ui/input';
import clsx from 'clsx';

interface Props extends React.ComponentProps<'input'> {
  errors?: [];
  hasError?: boolean;
}

export const CustomInput = ({
  errors = [],
  hasError = false,
  className,
  type,
  ...props
}: Props) => {
  return (
    <>
      <Input
        type={type}
        className={clsx(className, {
          'border-red-400': hasError,
        })}
        {...props}
      />
      {errors.length > 0 && (
        <span className='text-xs px-0.5 text-red-400'>{errors}</span>
      )}
    </>
  );
};
