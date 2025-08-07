import type { FC, MouseEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { CardAction } from '@/components/ui/card';

interface Props {
  className?: string;
  handleCopy: MouseEventHandler;
  handleEdit: MouseEventHandler;
  handleShare: MouseEventHandler;
}

export const LinkCardAction: FC<Props> = ({
  className,
  handleCopy,
  handleEdit,
  handleShare,
}) => {
  return (
    <CardAction className={className}>
      <Button className='flex-1 md:flex-none' variant='secondary' onClick={handleCopy}>
        Copy
      </Button>
      <Button variant='outline' onClick={handleShare}>
        Share
      </Button>
      <Button variant='outline' onClick={handleEdit}>
        Edit
      </Button>
    </CardAction>
  );
};
