import {
  useState,
  type FC,
  type MouseEvent,
  type MouseEventHandler,
} from 'react';

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
  Power,
  PowerOff,
  Share2,
  Trash,
} from 'lucide-react';
import { useLanguage } from '@/components/hooks/useLanguage';
import { debounceTimeout } from '@/utils/debounceTime';
import { TimeSpan } from '@/utils/timeSpan';

interface Props {
  className?: string;
  isActive?: boolean;
  handleCopy: MouseEventHandler;
  handleEdit: MouseEventHandler;
  handleShare?: MouseEventHandler;
  handleDelete?: MouseEventHandler;
  handleDetails?: MouseEventHandler;
  handleActivate?: MouseEventHandler;
  handleDeactivate?: MouseEventHandler;
}

export const LinkCardAction: FC<Props> = ({
  className,
  isActive,
  handleCopy: onCopy,
  handleEdit,
  handleShare,
  handleDelete,
  handleDetails,
  handleActivate,
  handleDeactivate,
}) => {
  const { translate: t } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    if (isCopied) return;
    onCopy(e);
    setIsCopied(true);
    debounceTimeout(() => setIsCopied(false), TimeSpan.fromSeconds(2))();
  };

  return (
    <CardAction className={className}>
      <Button
        variant='secondary'
        className='flex-1 md:flex-none'
        disabled={isCopied}
        onClick={handleCopy}
      >
        <Copy /> {isCopied ? t('copied') : t('copy')}
      </Button>
      {handleShare && (
        <Button variant='outline' onClick={handleShare}>
          <Share2 /> {t('share')}
        </Button>
      )}
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
            {isActive ? (
              <DropdownMenuItem onClick={handleDeactivate}>
                <PowerOff /> {t('deactivate')}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleActivate}>
                <Power /> {t('activate')}
              </DropdownMenuItem>
            )}

            {handleDelete && (
              <DropdownMenuItem onClick={handleDelete}>
                <Trash /> {t('delete')}
              </DropdownMenuItem>
            )}
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
