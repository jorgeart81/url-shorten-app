import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Link, useNavigate } from 'react-router';
import { ViewHeader } from '../components/ViewHeader';
import { Button } from '@/components/ui/button';
import { RoutePath } from '@/shared/constants/routePath';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export const LinkView = () => {
  const { translate: t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <Head title={t('links')} />
      <ViewHeader
        title='Links'
        button={
          <Button
            onClick={() =>
              navigate(RoutePath.CreateLink, { viewTransition: true })
            }
          >
            {t('createLink.button.create')}
          </Button>
        }
      />

      <Separator className='my-4' />

      <section className='flex flex-col min-h-[90%]'>
        <div className='self-end'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Show' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='hidden'>Hidden</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex-1 flex flex-col justify-center gap-4'>
          <div className='text-center py-8 text-muted-foreground'>
            <h3 className='text-lg font-semibold mb-2'>
              {t('linksView.noResults.title')}
            </h3>

            <p>
              {t('linksView.noResults.description').split('{{hiddenLink}}')[0]}
              <br />
              <Link
                to={{ search: '?archived=on' }}
                className='ml-auto underline-offset-4 underline dark:text-gray-300'
              >
                {t('linksView.noResults.hiddenLink')}
              </Link>
              {t('linksView.noResults.description').split('{{hiddenLink}}')[1]}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
