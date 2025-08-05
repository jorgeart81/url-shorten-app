import { useLanguage } from '@/components/hooks/useLanguage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface Props {
  backHalf: string;
  date: string;
  destination: string;
  destinationDomain: string;
  domain: string;
  title?: string;
}

export const LinkCard = ({
  backHalf,
  date,
  destination,
  destinationDomain,
  domain,
  title,
}: Props) => {
  const { translate: t } = useLanguage();
  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex gap-4'>
          <Checkbox id='link' />
          {/* image */}
          <div className='hidden sm:block sm:w-14'>
            <div className='p-1.5 bg-white size-11 rounded-full content-center overflow-clip'>
              <img
                className='rounded-full'
                src={`https://www.google.com/s2/favicons?domain=${destinationDomain}&sz=32`}
                alt='image'
              />
            </div>
          </div>
          {/* end */}
          <div>
            <CardTitle className='text-xl'>{title ?? t('untitled')}</CardTitle>
            <CardDescription className='flex flex-col items-start'>
              <Button className='p-0 text-lg text-blue-600' variant='link'>
                {domain}/{backHalf}
              </Button>
              <Button className='p-0 font-light h-min' variant='link'>
                {destination}
              </Button>
            </CardDescription>
          </div>
        </div>
        <CardAction className='hidden lg:flex gap-2'>
          <Button variant='secondary'>Copy</Button>
          <Button variant='outline'>Share</Button>
          <Button variant='outline'>Edit</Button>
        </CardAction>
      </CardHeader>
      <div className='mx-3'>
        <CardFooter className='flex gap-2 sm:ml-16'>
          <Badge
            className='h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'
            variant='outline'
          >
            {date}
          </Badge>
        </CardFooter>
      </div>

      <CardHeader className='lg:hidden flex flex-col'>
        <Separator className='mb-3' />
        <CardAction className='flex gap-2'>
          <Button variant='secondary'>Copy</Button>
          <Button variant='outline'>Share</Button>
          <Button variant='outline'>Edit</Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};
