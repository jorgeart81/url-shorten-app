import React, { type JSX } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.ComponentProps<'header'> {
  title: string;
  button?: JSX.Element;
}

export const ViewHeader = ({ button, title, className, ...props }: Props) => {
  return (
    <header
      className={twMerge(
        'flex flex-wrap items-center gap-2 justify-between mb-4',
        className
      )}
      {...props}
    >
      <h1 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        {title}
      </h1>
      {button}
    </header>
  );
};
