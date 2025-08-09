import { type FC, type JSX } from 'react';
import { Separator } from './ui/separator';

interface Props {
  title: string;
  description: string;
  children: JSX.Element | JSX.Element[];
}

export const FallbackContent: FC<Props> = ({
  title,
  description,
  children,
}) => {
  return (
    <section className='h-dvh p-6 flex justify-center items-center'>
      <div className='max-w-lg'>
        <div className='space-y-1'>
          <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight text-center'>
            {title}
          </h1>

          <p className='text-muted-foreground text-sm m-2 text-center'>
            {description}
          </p>
        </div>
        <Separator className='my-4' />
        <div className='flex h-5 items-center justify-center space-x-4 text-sm'>
          {children}
        </div>
      </div>
    </section>
  );
};
