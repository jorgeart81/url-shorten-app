import { Check, Copy, Download, Share2 } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { type FC, useRef, useState } from 'react';

import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { debounceTimeout } from '@/utils/debounceTime';
import { TimeSpan } from '@/utils/timeSpan';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortUrl: string;
  shortLink: string;
}

const canShareFiles = (files: File[]) =>
  typeof navigator.canShare === 'function' && navigator.canShare({ files });

export const ShareLinkDialog: FC<Props> = ({
  open,
  onOpenChange,
  shortUrl,
  shortLink,
}) => {
  const { translate: t } = useLanguage();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const getCanvas = () =>
    canvasContainerRef.current?.querySelector('canvas') ?? null;

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    debounceTimeout(() => setIsCopied(false), TimeSpan.fromSeconds(2))();
  };

  const handleDownload = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${shortLink.replace(/[^\w.-]+/g, '-')}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `${shortLink}-qr.png`, {
        type: 'image/png',
      });
      if (!canShareFiles([file])) return;
      navigator.share({ files: [file], url: shortUrl, title: shortLink });
    }, 'image/png');
  };

  const supportsShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>{t('shareLink.title')}</DialogTitle>
          <DialogDescription>{t('shareLink.description')}</DialogDescription>
        </DialogHeader>

        <div className='flex flex-col items-center gap-4'>
          <div
            ref={canvasContainerRef}
            className='rounded-lg border bg-white p-4'
          >
            <QRCodeCanvas value={shortUrl} size={192} />
          </div>

          <div className='flex w-full items-center gap-2'>
            <p className='bg-muted flex-1 truncate rounded-md px-3 py-2 text-sm'>
              {shortLink}
            </p>
            <Button
              variant='outline'
              size='icon'
              disabled={isCopied}
              onClick={handleCopy}
              aria-label={t('copy')}
            >
              {isCopied ? <Check /> : <Copy />}
            </Button>
          </div>

          <div className='flex w-full gap-2'>
            <Button
              variant='outline'
              className='flex-1'
              onClick={handleDownload}
            >
              <Download /> {t('download')}
            </Button>
            {supportsShare && (
              <Button className='flex-1' onClick={handleShare}>
                <Share2 /> {t('share')}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
