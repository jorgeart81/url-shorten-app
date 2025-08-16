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
      className={clsx('w-full', {
        'border-blue-900': checked,
      })}
    >
      <CardHeader className='flex gap-4'>
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

        <div className='flex-1 flex flex-col'>
          <LinkCardTitle goTo={detailsRoute} variant={variant} title={title} />

          <div className='flex flex-row gap-4'>
            <LinkCardImage
              hidden={variant === 'link'}
              domain={destinationDomain}
            />

            <div className='flex flex-col items-start gap-1'>
              <Button
                asChild
                variant='link'
                className='p-0 h-6 text-lg text-blue-600'
              >
                <a href={shortUrl} target='_blank'>
                  {shortLink}
                </a>
              </Button>
              <Button asChild variant='link' className='p-0 font-light h-min'>
                <a href={destination} target='_blank'>
                  {destination}
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
          className='hidden lg:flex gap-2'
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
