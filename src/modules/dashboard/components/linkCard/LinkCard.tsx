import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import clsx from 'clsx';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { RoutePath } from '@/shared/constants/routePath';
import { useLanguage } from '@/components/hooks/useLanguage';
import { getShortFormattedDate, type Locales } from '@/utils/dateUtils';
import { LinkCardAction } from './LinkCardAction';
import { LinkCardImage } from './LinkCardImage';
import { LinkCardTitle } from './LinkCardTitle';

import type { CardVariant } from './cardVariant';

interface Props {
  backHalf: string;
  date: Date;
  destination: string;
  destinationDomain: string;
  domain: string;
  title: string;
  checked?: boolean;
  variant?: CardVariant;
  onCheckedChange?: (isChecked: boolean) => void;
}

export const LinkCard = ({
  backHalf,
  date,
  destination,
  destinationDomain,
  domain,
  title,
  checked = false,
  variant = 'link',
  onCheckedChange,
}: Props) => {
  const protocol = window.location.protocol;
  const shortLink = `${domain}/${backHalf}`;
  const shortUrl = `${protocol}//${shortLink}`;
  const detailsRoute = `${RoutePath.Links}/${backHalf}/details`;

  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shortUrl);
  }, [shortUrl]);

  const handleDetails =
    variant === 'link'
      ? () =>
          navigate(detailsRoute, {
            viewTransition: true,
          })
      : undefined;

  const handleEdit = () => {
    navigate(`${RoutePath.Links}/${backHalf}/edit`, {
      viewTransition: true,
    });
  };

  return (
    <Card
      className={clsx('relative w-full', {
        'border-blue-900': checked,
      })}
    >
      <CardHeader className='relative flex gap-4'>
        {variant === 'link' && (
          <>
            <Checkbox
              id='link'
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
            <LinkCardImage domain={destinationDomain} />
          </>
        )}

        <div
          className={clsx(
            'flex-1 flex flex-col max-w-full lg:max-w-[calc(100%-200px)]',
            {
              ' lg:max-w-[calc(100%-300px)]': variant === 'link',
            }
          )}
        >
          <LinkCardTitle goTo={detailsRoute} variant={variant} title={title} />

          <div className='flex flex-row gap-4 over'>
            <LinkCardImage
              hidden={variant === 'link'}
              domain={destinationDomain}
            />

            <div className='relative flex flex-col items-start gap-1 max-w-[calc(100%-30px)] md:max-w-[calc(100%-100px)] lg:max-w-full overflow-hidden'>
              <Button
                asChild
                variant='link'
                className='relative p-0 h-6 text-lg text-blue-600 max-w-full'
                title={shortLink}
              >
                <a
                  href={shortUrl}
                  className='flex justify-start'
                  target='_blank'
                >
                  <p className='relative max-w-full truncate'>{shortLink}</p>
                </a>
              </Button>

              <Button
                asChild
                variant='link'
                className='relative p-0 font-light h-min r-4 max-w-full'
                title={destination}
              >
                <a
                  href={destination}
                  className='flex justify-start'
                  target='_blank'
                >
                  <p className='relative truncate'>{destination}</p>
                </a>
              </Button>
            </div>
          </div>

          <div className='flex gap-2 mt-6'>
            <Badge
              className=' h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'
              variant='outline'
            >
              {getShortFormattedDate(date, currentLanguage as Locales)}
            </Badge>
          </div>
        </div>

        <LinkCardAction
          className='hidden lg:flex gap-2 relative'
          handleCopy={handleCopy}
          handleEdit={handleEdit}
          handleDelete={() => {}}
          handleDetails={handleDetails}
        />
      </CardHeader>

      <CardHeader className='lg:hidden flex flex-col'>
        <Separator className='mb-3' />
        <LinkCardAction
          className='w-full flex gap-2 justify-end'
          handleCopy={handleCopy}
          handleEdit={handleEdit}
          handleDelete={() => {}}
          handleDetails={handleDetails}
        />
      </CardHeader>
    </Card>
  );
};
