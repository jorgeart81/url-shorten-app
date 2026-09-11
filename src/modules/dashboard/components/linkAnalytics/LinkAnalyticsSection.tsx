import { type FC, use } from 'react';

import { useLanguage } from '@/components/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LinkAnalytics } from '../../services/links/dtos/linkResponse';
import { ClickBreakdownChart } from './ClickBreakdownChart';

interface Props {
  getAnalytics: Promise<LinkAnalytics | undefined>;
}

export const LinkAnalyticsSection: FC<Props> = ({ getAnalytics }) => {
  const analytics = use(getAnalytics);
  const { translate: t } = useLanguage();

  if (!analytics || analytics.totalClicks === 0) {
    return (
      <Card className='mt-6'>
        <CardContent className='text-muted-foreground text-sm'>
          {t('analytics.noData')}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle>{t('analytics.title')}</CardTitle>
        <p className='text-muted-foreground text-sm'>
          {t('analytics.totalClicks')}: {analytics.totalClicks}
        </p>
      </CardHeader>
      <CardContent className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <ClickBreakdownChart
          title={t('analytics.byDevice')}
          data={analytics.byDevice}
        />
        <ClickBreakdownChart
          title={t('analytics.byReferrer')}
          data={analytics.byReferrer}
        />
        <ClickBreakdownChart
          title={t('analytics.byLocation')}
          data={analytics.byLocation}
        />
      </CardContent>
    </Card>
  );
};
