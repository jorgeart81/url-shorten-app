import { use, type FC } from 'react';
import { useNavigate } from 'react-router';

import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { RoutePath } from '@/shared/constants/routePath';
import { LinkCard } from './linkCard/LinkCard';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon, ChevronLeft } from 'lucide-react';
import type { LinkData } from '../services/links/dtos/linkResponse';

interface Props {
  getLink: Promise<LinkData | undefined>;
}

export const LinkDetails: FC<Props> = ({ getLink }) => {
  const link = use(getLink);
  const navigate = useNavigate();
  const { translate: t } = useLanguage();

  return (
    <>
      <div className='mb-4'>
        <Button
          variant='ghost'
          onClick={() => navigate(RoutePath.Links, { viewTransition: true })}
        >
          <ChevronLeft /> {t('backToList')}
        </Button>
      </div>

      {link ? (
        <LinkCard
          backHalf={link.backHalf}
          date={new Date(link.createdAt)}
          destination={link.destination}
          destinationDomain={link.destinationDomain}
          domain={link.domain}
          title={link.title}
          variant='details'
        />
      ) : (
        <Alert variant='destructive'>
          <AlertCircleIcon />
          <AlertTitle>{t('errorAlert.notFound')}</AlertTitle>
        </Alert>
      )}
    </>
  );
};
