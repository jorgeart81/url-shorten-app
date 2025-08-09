import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

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
import { LinkCard } from '../components/linkCard/LinkCard';
import { NoLinksContent } from '../components/NoLinksContent';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { useDashboardStore } from '../store/dashboardStore';

export const LinkView = () => {
  const { translate: t } = useLanguage();
  const navigate = useNavigate();

  const links = useDashboardStore((state) => state.links);
  const loadLinks = useDashboardStore((state) => state.loadLinks);
  const [selectLinks, setSelectLinks] = useState<Record<string, boolean>>({});

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

        <div className='flex-1 flex flex-col itema-center gap-4 py-6'>
          {links.data.length > 0 ? (
            links.data.map((link) => (
              <LinkCard
                key={link.id}
                backHalf={link.backHalf}
                date={new Date(link.createdAt)}
                destination={link.destination}
                destinationDomain={link.destinationDomain}
                domain={link.domain}
                title={link.title ?? t('untitled')}
                onCheckedChange={(isChecked) => {
                  setSelectLinks((prev) => ({
                    ...prev,
                    [link.id]: isChecked,
                  }));
                }}
                checked={selectLinks[link.id]}
              />
            ))
          ) : (
            <NoLinksContent />
          )}
        </div>
      </section>
    </ViewContainer>
  );
};
