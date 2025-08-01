import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';

export const LinkView = () => {
  const { translate: t } = useLanguage();

  return (
    <>
      <Head title={t('links')} />
      <div>LinkView</div>
    </>
  );
};
