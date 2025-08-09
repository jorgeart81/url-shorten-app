import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router';

import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { RoutePath } from '@/shared/constants/routePath';
import { LinkDetails } from '../components/LinkDetails';
import { ViewContainer } from '../components/ViewContainer';
import { LinkService } from '../services/links/linkService';
import { mapLinkDataToLink } from '../store/mappers/linkMapper';

import type { Link } from '../store/types/link';

export const LinkDetailsView = () => {
  const { backHalf } = useParams();
  if (!backHalf) return <Navigate to={RoutePath.Links} />;

  const getLink = async (): Promise<Link | undefined> => {
    const { value } = await LinkService.find(backHalf);
    return value?.data ? mapLinkDataToLink(value.data) : undefined;
  };

  return (
    <ViewContainer>
      <Suspense fallback={<PendingSpinner size='sm' fullSize />}>
        <LinkDetails getLink={getLink()} />
      </Suspense>
    </ViewContainer>
  );
};
