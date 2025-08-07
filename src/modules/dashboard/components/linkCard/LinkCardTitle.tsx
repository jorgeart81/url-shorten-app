import type { FC } from 'react';
import { Link } from 'react-router';

import clsx from 'clsx';

import { CardTitle } from '@/components/ui/card';
import type { CardVariant } from './cardVariant';

interface Props {
  goTo: string;
  title: string;
  variant: CardVariant;
}

export const LinkCardTitle: FC<Props> = ({ goTo, title, variant }) => {
  return (
    <CardTitle
      className={clsx('text-xl', {
        'underline-offset-4 hover:underline mb-1': variant === 'link',
        'text-4xl mb-4': variant === 'details',
      })}
    >
      {variant === 'link' ? (
        <Link to={goTo} viewTransition>
          {title}
        </Link>
      ) : (
        title
      )}
    </CardTitle>
  );
};
