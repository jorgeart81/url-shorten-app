import { useEffect, useRef, useState, useTransition } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { RoutePath } from '@/shared/constants/routePath';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { LinkService } from '../services/links/linkService';
import { mapLinkDataToLink } from '../store/mappers/linkMapper';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { LinkEditForm } from '../components/LinkEditForm';

import type { Link } from '../store/types/link';

export const LinkEditView = () => {
  const navigate = useNavigate();
  const { backHalf } = useParams();

  const { translate: t } = useLanguage();
  const [link, setLink] = useState<Link | undefined>();
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!backHalf) return;

    startTransition(async () => {
      const { value } = await LinkService.find(backHalf);
      if (value?.data) setLink(mapLinkDataToLink(value.data));
    });
  }, [backHalf]);

  if (!backHalf) return <Navigate to={RoutePath.Links} />;

  if (isPending)
    return (
      <ViewContainer>
        <PendingSpinner size='sm' fullSize />
      </ViewContainer>
    );

  if (!link)
    return (
      <ViewContainer>
        <Alert variant='destructive'>
          <AlertCircleIcon />
          <AlertTitle>{t('errorAlert.notFound')}</AlertTitle>
        </Alert>
      </ViewContainer>
    );

  return (
    <>
      <ViewContainer>
        <Head title={t('links')} />
        <div className='w-full max-w-3xl justify-self-center'>
          <ViewHeader title={`${t('edit')} ${t('link').toLocaleLowerCase()}`} />
          <LinkEditForm ref={formRef} link={link} />
        </div>
      </ViewContainer>

      <footer className='bg-sidebar border-sidebar-border border-t flex justify-center p-3 sm:p-4'>
        <div className='w-screen max-w-3xl flex justify-between'>
          <Button variant='outline' onClick={() => navigate(RoutePath.Links)}>
            {t('cancel')}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              formRef.current?.requestSubmit();
            }}
            className='w-fit'
          >
            {t('save')}
          </Button>
        </div>
      </footer>
    </>
  );
};
