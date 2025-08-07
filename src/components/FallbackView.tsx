import { Button } from '@/components/ui/button';
import { useLanguage } from './hooks/useLanguage';
import { Separator } from './ui/separator';
import { RotateCcw } from 'lucide-react';

export const FallbackView = () => {
  const { translate } = useLanguage();

  return (
    <section className='h-dvh p-6 flex justify-center items-center'>
      <div className='max-w-lg'>
        <div className='space-y-1'>
          <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight text-center'>
            {translate('errorBoundary.title')}
          </h1>

          <p className='text-muted-foreground text-sm m-2 text-center'>
            {translate('errorBoundary.description')}
          </p>
        </div>
        <Separator className='my-4' />
        <div className='flex h-5 items-center justify-center space-x-4 text-sm'>
          <Button variant='ghost' onClick={() => window.location.reload()}>
            <RotateCcw /> {translate('errorBoundary.reloadButton')}
          </Button>
        </div>
      </div>
    </section>
  );
};
