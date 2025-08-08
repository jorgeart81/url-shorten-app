import { Navigate, useParams } from 'react-router';

import { RoutePath } from '@/shared/constants/routePath';
import { LinkDetails } from '../components/LinkDetails';
import { ViewContainer } from '../components/ViewContainer';
import { LinkService } from '../services/links/linkService';
import { mapLinkDataToLink } from '../store/mappers/linkMapper';
import { Suspense } from 'react';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';

export const LinkDetailsView = () => {
  const { backHalf } = useParams();
  if (!backHalf) return <Navigate to={RoutePath.Links} />;

  const getLink = async () => {
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
