import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FallbackContent } from './FallbackContent ';
import { useLanguage } from './hooks/useLanguage';

export const FallbackView = () => {
  const { translate } = useLanguage();

  return (
    <FallbackContent
      title={translate('errorBoundary.title')}
      description={translate('errorBoundary.description')}
    >
      <Button variant='ghost' onClick={() => window.location.reload()}>
        <RotateCcw /> {translate('errorBoundary.reloadButton')}
      </Button>
    </FallbackContent>
  );
};
