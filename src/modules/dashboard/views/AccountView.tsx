import { useState } from 'react';

import { Label } from '@radix-ui/react-label';

import { CustomInput } from '@/components/form/CustomInput';
import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { useDashboardStore } from '../store/dashboardStore';
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
import clsx from 'clsx';

export const AccountView = () => {
  const { translate: t } = useLanguage();
  const devices = useDashboardStore((state) => state.devices);
  const user = useDashboardStore((state) => state.user);

  const [userName, setUserName] = useState(user.displayName);

  return (
    <ViewContainer>
      <Head title={t('myAccount')} />
      <ViewHeader title={t('myAccount')} />

      <section>
        <h2 className='mb-2 scroll-m-20 text-2xl font-semibold tracking-tight'>
          {t('preferences')}
        </h2>

        <form>
          <div className='md:flex gap-3'>
            <div className='grid gap-3 flex-1'>
              <Label htmlFor='userName'>{t('userName')}</Label>
              <CustomInput
                id='userName'
                name='userName'
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className='grid gap-3 flex-1'>
              <Label htmlFor='email'>{t('email')}</Label>
              <CustomInput
                id='email'
                name='email'
                type='email'
                defaultValue={user.email}
                disabled
              />
            </div>
          </div>
          <Button
            type='submit'
            className='w-full md:w-fit mt-6'
            disabled={userName === user.displayName}
          >
            {t('update')}
          </Button>
        </form>
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
                  'opacity-50': device.isCurrentDevice,
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
