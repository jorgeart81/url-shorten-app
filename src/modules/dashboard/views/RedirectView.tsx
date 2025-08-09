import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router';

import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { RoutePath } from '@/shared/constants/routePath';
import { Redirect } from '../components/Redirect';
import { LinkService } from '../services/links/linkService';

export const RedirectView = () => {
  const { backHalf } = useParams();

  if (!backHalf) return <Navigate to={RoutePath.Login} />;

  const getDestinationUrl = async (): Promise<string | undefined> => {
    const controller = new AbortController();
    const { success, value } = await LinkService.getDestination(
      backHalf,
      controller
    );

    if (!success || !value?.destination) return;

    return value.destination;
  };

  return (
    <Suspense fallback={<PendingSpinner fullScreen size='sm' />}>
      <Redirect getDestinationUrl={getDestinationUrl()} />
    </Suspense>
  );
};
