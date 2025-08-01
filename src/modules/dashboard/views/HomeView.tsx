import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';

export const HomeView = () => {
  const { translate: t  } = useLanguage();

  return (
    <>
      <Head title={t('home')} />

      <div>Home View</div>
    </>
  );
};
