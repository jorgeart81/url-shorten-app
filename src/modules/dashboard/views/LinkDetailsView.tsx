import { useNavigate, useParams } from 'react-router';

import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { RoutePath } from '@/shared/constants/routePath';
import { useEffect, useState } from 'react';
import { LinkCard } from '../components/linkCard/LinkCard';
import { ViewContainer } from '../components/ViewContainer';
import type { LinkData } from '../services/links/dtos/linkResponse';
import { LinkService } from '../services/links/linkService';

export const LinkDetailsView = () => {
  const { backHalf } = useParams();
  const navigate = useNavigate();

  const [link, setLink] = useState<LinkData>();

  const { translate: t } = useLanguage();

  useEffect(() => {
    if (backHalf)
      LinkService.find({ backHalf }).then((r) => {
        console.log(r.value?.data);
        setLink(r.value?.data);
      });
  }, [backHalf]);

  return (
    <ViewContainer>
      <Button
        variant='ghost'
        onClick={() => navigate(RoutePath.Links, { viewTransition: true })}
      >
        {t('backToList')}
      </Button>

      <div>LinkDetailsView: {backHalf}</div>
      {link && (
        <LinkCard
          backHalf={link.backHalf}
          date={new Date(link.createdAt)}
          destination={link.destination}
          destinationDomain={link.destinationDomain}
          domain={link.domain}
          title={link.title}
          variant='details'
        />
      )}
    </ViewContainer>
  );
};
