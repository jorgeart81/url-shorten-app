import { useLanguage } from '@/components/hooks/useLanguage';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Props {
  onExit: () => void;
}

export default function ResendEmailDialog({ onExit }: Props) {
  const { translate } = useLanguage();
  
  return (
    <>
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {translate('emailResend.title')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {translate('emailResend.tooMany')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onExit}>
              {translate('emailResend.buttonExit')}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
