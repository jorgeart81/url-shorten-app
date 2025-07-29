import { Button } from '@/components/ui/button';
import { useLanguage } from './hooks/useLanguage';
import { Separator } from './ui/separator';

export const FallbackView = () => {
  const { translate } = useLanguage();

  return (
    <section className='size-full p-6 content-center'>
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
          {translate('errorBoundary.reloadButton')}
        </Button>
      </div>
    </section>
  );
};
