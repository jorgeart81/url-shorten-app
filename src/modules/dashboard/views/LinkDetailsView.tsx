import { useNavigate, useParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { LinkCard } from '../components/linkCard/LinkCard';
import { ViewContainer } from '../components/ViewContainer';
import { RoutePath } from '@/shared/constants/routePath';
import { useLanguage } from '@/components/hooks/useLanguage';

export const LinkDetailsView = () => {
  const { backHalf } = useParams();
  const navigate = useNavigate();

  const { translate: t } = useLanguage();

  return (
    <ViewContainer>
      <Button
        variant='ghost'
        onClick={() => navigate(RoutePath.Links, { viewTransition: true })}
      >
        {t('backToList')}
      </Button>

      <div>LinkDetailsView: {backHalf}</div>
      <LinkCard
        backHalf={backHalf ?? ''}
        date={'date'}
        destination={'destination'}
        destinationDomain={'destinationDomain'}
        domain={'domain'}
        title={'title'}
        variant='details'
      />
    </ViewContainer>
  );
};
