import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
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
import { RoutePath } from '@/shared/constants/routePath';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { useDashboardStore } from '../store/dashboardStore';
import { LinkCard } from '../components/LinkCard';
import { getShortFormattedDate } from '@/utils/dateUtils';

export const LinkView = () => {
  const { translate: t } = useLanguage();
  const navigate = useNavigate();

  const links = useDashboardStore((state) => state.links);
  const loadLinks = useDashboardStore((state) => state.loadLinks);

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <ViewContainer>
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

      <Separator className='mb-4' />

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

        <div className='flex-1 flex flex-col justify-center gap-4 py-6'>
          {links.data.length > 0 ? (
            links.data.map((link) => (
              <LinkCard
                key={link.backHalf}
                backHalf={link.backHalf}
                date={getShortFormattedDate(new Date(link.createdAt), 'es-ES')}
                destination={link.destination}
                destinationDomain={link.destinationDomain}
                domain={link.domain}
                title={link.title}
              />
            ))
          ) : (
            <div className='text-center text-muted-foreground'>
              <h3 className='text-lg font-semibold mb-2'>
                {t('linksView.noResults.title')}
              </h3>

              <p>
                {
                  t('linksView.noResults.description').split(
                    '{{hiddenLink}}'
                  )[0]
                }
                <br />
                <Link
                  to={{ search: '?archived=on' }}
                  className='ml-auto underline-offset-4 underline dark:text-gray-300'
                >
                  {t('linksView.noResults.hiddenLink')}
                </Link>
                {
                  t('linksView.noResults.description').split(
                    '{{hiddenLink}}'
                  )[1]
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </ViewContainer>
  );
};
