import type { FC } from 'react';
import { NavLink } from 'react-router';

import { BarChart3, Link2, QrCode, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RoutePath } from '@/shared/constants/routePath';

import styles from './heroBackground.module.css';

const features = [
  {
    icon: Link2,
    title: 'Custom Back-Halves',
    description:
      'Create memorable, branded short links with a custom back-half.',
  },
  {
    icon: BarChart3,
    title: 'Click Analytics',
    description:
      'See where your clicks come from — devices, locations, and referrers.',
  },
  {
    icon: QrCode,
    title: 'QR Codes',
    description: 'Generate a QR code for every link, ready to print or share.',
  },
  {
    icon: ShieldCheck,
    title: 'Fast & Secure',
    description: 'Every redirect is fast, encrypted, and reliable.',
  },
];

export const LandingView: FC = () => (
  <main>
    <header className='relative overflow-hidden'>
      <div className={styles['hero-background']} />

      <div className='relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center'>
        <h1 className='mb-5 text-4xl font-bold tracking-tight text-balance md:text-5xl'>
          Shorten links.
          <br />
          Track everything.
        </h1>
        <p className='text-muted-foreground mb-9 max-w-xl text-lg text-balance'>
          Create branded short links, watch every click roll in, and share
          anywhere — all in seconds.
        </p>

        <div className='mb-3 flex gap-3'>
          <Button asChild size='lg'>
            <NavLink to={RoutePath.Signup} viewTransition>
              Sign Up Free
            </NavLink>
          </Button>
        </div>
        <p className='text-muted-foreground mb-16 text-sm'>
          Free — no credit card required
        </p>

        <Card className='w-full max-w-md gap-4 p-6 text-left'>
          <div>
            <p className='text-muted-foreground mb-2 text-xs font-medium'>
              Your long URL
            </p>
            <div className='flex gap-2'>
              <Input
                readOnly
                value='https://example.com/your-very-long-marketing-link'
                className='truncate'
              />
              <Button className='shrink-0'>Shorten</Button>
            </div>
          </div>
          <div className='bg-border h-px' />
          <div className='flex items-center justify-between gap-3'>
            <span className='font-semibold'>url.sh/promo</span>
            <Button variant='outline' size='sm'>
              Copy
            </Button>
          </div>
        </Card>
        <p className='text-muted-foreground mt-4 text-xs'>
          Create a free account to start shortening your own links.
        </p>
      </div>
    </header>

    <section className='mx-auto max-w-5xl px-6 py-16'>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title} className='gap-3.5 p-6'>
            <Icon className='size-6' />
            <h3 className='font-semibold'>{title}</h3>
            <p className='text-muted-foreground text-sm'>{description}</p>
          </Card>
        ))}
      </div>
    </section>

    <section className='mx-auto max-w-5xl px-6 pb-24'>
      <Card className='items-center gap-5 p-12 text-center'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Ready to shorten your first link?
        </h2>
        <p className='text-muted-foreground -mt-2 text-sm'>
          Free forever — no credit card required
        </p>
        <Button asChild size='lg'>
          <NavLink to={RoutePath.Signup} viewTransition>
            Sign Up Free
          </NavLink>
        </Button>
      </Card>
    </section>
  </main>
);
