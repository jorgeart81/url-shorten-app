import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

interface Props {
  label: string;
  isPending: boolean;
}

export const AuthFormButton = ({ label, isPending }: Props) => {
  return (
    <Button type='submit' className='w-full relative' disabled={isPending}>
      {isPending && <Loader2Icon className='animate-spin' />}
      {label}
    </Button>
  );
};
