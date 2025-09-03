import { useEffect, useState, useTransition } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { PaginationBar } from '@/components/pagination/PaginationBar';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
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
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { CheckedState } from '@radix-ui/react-checkbox';

export const LinkView = () => {
  const [isPending, startTransition] = useTransition();

  const { translate: t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const archived = searchParams.get('archived');
  const showStatus = archived === 'on' ? 'hidden' : 'active';

  const {
    data: links,
    pageNumber,
    pageSize,
    totalRecords,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = useDashboardStore((state) => state.links);
  const loadLinks = useDashboardStore((state) => state.loadLinks);
  const [selectLinks, setSelectLinks] = useState<Record<string, boolean>>({});
  const selectedCount = Object.values(selectLinks).filter(
    (isSelect) => isSelect
  ).length;

  useEffect(() => {
    if (isNaN(page) || page < 0) return;
    startTransition(async () => {
      await loadLinks(page, showStatus === 'active');
    });
  }, [loadLinks, page, showStatus]);

  const selectAll = () => {
    if (links.length === 0) {
      setSelectLinks({});
      return;
    }

    const allSelected = links.reduce<Record<string, boolean>>((acc, link) => {
      acc[link.id] = true;
      return acc;
    }, {});
    setSelectLinks(allSelected);
  };

  const handleChecked = (): CheckedState => {
    if (links.length > 0 && links.length === selectedCount) return true;
    if (selectedCount > 0) return 'indeterminate';
    return false;
  };

  const handleShow = (value: string) => {
    const params = new URLSearchParams();
    if (value === 'hidden') {
      params.set('archived', 'on');
    } else {
      params.delete('archived');
    }
    setSearchParams(params);
    setSelectLinks({});
  };

  return (
    <ViewContainer>
      <Head title={t('links')} />
      <ViewHeader
        title={t('links')}
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

      <section className='flex flex-col min-h-[calc(100dvh-250px)]'>
        <div className='w-full flex justify-between'>
          <div className='flex items-center gap-3'>
            <Checkbox
              id='terms'
              checked={handleChecked()}
              onCheckedChange={(isChecked) =>
                isChecked ? selectAll() : setSelectLinks({})
              }
            />
            <Label htmlFor='terms'>
              {selectedCount} {t('selected').toLocaleLowerCase()}
            </Label>
          </div>

          <Select onValueChange={handleShow} value={showStatus}>
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

        {isPending ? (
          <PendingSpinner size='sm' fullSize className='my-auto' />
        ) : (
          <div className='flex flex-col item-center gap-4 py-6'>
            {links.length > 0 ? (
              <>
                {links.map((link) => (
                  <LinkCard
                    key={link.id}
                    id={link.id}
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
                    isActive={link.isActive}
                  />
                ))}
                <PaginationBar
                  pageNumber={pageNumber}
                  pageSize={pageSize}
                  totalRecords={totalRecords}
                  totalPages={totalPages}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                />
              </>
            ) : (
              <div className='flex flex-col'>
                <NoLinksContent />
              </div>
            )}
          </div>
        )}
      </section>
    </ViewContainer>
  );
};
