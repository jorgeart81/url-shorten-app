import type { FC, MouseEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { CardAction } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Copy,
  EllipsisVertical,
  Link2,
  Pencil,
  Share2,
  Trash,
} from 'lucide-react';
import { useLanguage } from '@/components/hooks/useLanguage';

interface Props {
  className?: string;
  handleCopy: MouseEventHandler;
  handleEdit: MouseEventHandler;
  handleShare: MouseEventHandler;
  handleDelete: MouseEventHandler;
  handleDetails?: MouseEventHandler;
}

export const LinkCardAction: FC<Props> = ({
  className,
  handleCopy,
  handleEdit,
  handleShare,
  handleDelete,
  handleDetails,
}) => {
  const { translate: t } = useLanguage();
  return (
    <CardAction className={className}>
      <Button
        className='flex-1 md:flex-none'
        variant='secondary'
        onClick={handleCopy}
      >
        <Copy /> {t('copy')}
      </Button>
      <Button variant='outline' onClick={handleShare}>
        <Share2 /> {t('share')}
      </Button>
      <Button
        title={t('edit').toLocaleLowerCase()}
        aria-label={`${t('edit')} link`}
        variant='outline'
        onClick={handleEdit}
      >
        <Pencil />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            title={t('moreOptions').toLocaleLowerCase()}
            aria-label={t('more')}
            variant='outline'
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='start'>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash /> {t('delete')}
            </DropdownMenuItem>
            {handleDetails && (
              <DropdownMenuItem onClick={handleDetails}>
                <Link2 className='rotate-45' /> {t('view.link.details')}
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardAction>
  );
};
