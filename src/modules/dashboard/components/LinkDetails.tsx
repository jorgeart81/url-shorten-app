import { type FC, Suspense, use } from 'react';

import { AlertCircleIcon, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useLanguage } from '@/components/hooks/useLanguage';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RoutePath } from '@/shared/constants/routePath';
import type { LinkAnalytics } from '../services/links/dtos/linkResponse';
import { LinkService } from '../services/links/linkService';
import type { Link } from '../store/types/link';
import { LinkAnalyticsSection } from './linkAnalytics/LinkAnalyticsSection';
import { LinkCard } from './linkCard/LinkCard';
import { NoLinksContent } from './NoLinksContent';

interface Props {
  getLink: Promise<Link | undefined>;
}

export const LinkDetails: FC<Props> = ({ getLink }) => {
  const link = use(getLink);
  const navigate = useNavigate();
  const { translate: t } = useLanguage();

  if (!link?.id)
    return (
      <div className='flex flex-col'>
        <NoLinksContent />
      </div>
    );

  const getAnalytics = async (): Promise<LinkAnalytics | undefined> => {
    const { value } = await LinkService.getAnalytics(link.id);
    return value?.data;
  };

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
        <>
          <LinkCard
            id={link.id}
            backHalf={link.backHalf}
            date={new Date(link.createdAt)}
            destination={link.destination}
            destinationDomain={link.destinationDomain}
            domain={link.domain}
            title={link.title}
            isActive={link.isActive}
            variant='details'
          />

          <Suspense
            fallback={
              <PendingSpinner size='sm' fullSize className='mt-6 h-40' />
            }
          >
            <LinkAnalyticsSection getAnalytics={getAnalytics()} />
          </Suspense>
        </>
      ) : (
        <Alert variant='destructive'>
          <AlertCircleIcon />
          <AlertTitle>{t('errorAlert.notFound')}</AlertTitle>
        </Alert>
      )}
    </>
  );
};
