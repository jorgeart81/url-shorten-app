import type { FC } from 'react';

import clsx from 'clsx';

import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AccountPreferencesForm } from '../components/account/AccountPreferencesForm';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { useDashboardStore } from '../store/dashboardStore';

export const AccountView: FC = () => {
  const { translate: t } = useLanguage();
  const devices = useDashboardStore((state) => state.devices);
  const user = useDashboardStore((state) => state.user);

  return (
    <ViewContainer>
      <Head title={t('myAccount')} />
      <ViewHeader title={t('myAccount')} />

      <section>
        <h2 className='mb-2 scroll-m-20 text-2xl font-semibold tracking-tight'>
          {t('preferences')}
        </h2>

        {user && <AccountPreferencesForm user={user} />}
      </section>

      <Separator className='my-4' />
      <section className='mt-4'>
        <h2 className='mb-2 scroll-m-20 text-2xl font-semibold tracking-tight'>
          {t('device')}
        </h2>
        <Table>
          <TableCaption>{t('recentDevices.list.title')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-fit'>{t('device')}</TableHead>
              <TableHead>{t('client')}</TableHead>
              <TableHead>{t('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow
                key={device.id}
                className={clsx('font-medium', {
                  'opacity-50': !device.isCurrentDevice,
                })}
              >
                <TableCell className='font-medium'>
                  {device.deviceName}
                </TableCell>
                <TableCell>{device.clientType}</TableCell>
                <TableCell>
                  {device.isActive
                    ? t('active').toLocaleLowerCase()
                    : t('inactive').toLocaleLowerCase()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className='text-right'>{devices.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </ViewContainer>
  );
};
