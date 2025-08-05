import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { ViewContainer } from '../components/ViewContainer';

export const HomeView = () => {
  const { translate: t  } = useLanguage();

  return (
    <ViewContainer>
      <Head title={t('home')} />

      <div>Home View</div>
    </ViewContainer>
  );
};
