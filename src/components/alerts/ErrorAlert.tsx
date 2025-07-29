import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  list?: string[];
}

export const ErrorAlert = ({ title, description, list = [] }: Props) => {
  return (
    <Alert variant='destructive'>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{description}</p>
        {list.length > 0 && (
          <ul className='list-inside list-disc text-sm'>
            {list?.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  );
};
