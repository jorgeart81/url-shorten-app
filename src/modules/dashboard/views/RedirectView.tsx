import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { RoutePath } from '@/shared/constants/routePath';
import { LinkService } from '../services/links/linkService';

export const RedirectView = () => {
  const { backHalf } = useParams();
  const [destnation, setDestination] = useState<string>();

  useEffect(() => {
    if (!backHalf) return;
    const controller = new AbortController();

    LinkService.getDestination(backHalf, controller).then((r) => {
      console.log(r);
      if (!r.success || !r.value?.destination) return;
      setDestination(r.value.destination);
    });

    return () => {
      controller.abort();
    };
  }, [backHalf]);

  if (!backHalf) return <Navigate to={RoutePath.Login} />;

  if (destnation) {
    window.location.replace(destnation);
    return null;
  }

  return <div>Show Error</div>;
};
