import { startTransition, useActionState, useRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import { z } from 'zod/v4';

import { CustomInput } from '@/components/form/CustomInput';
import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoutePath } from '@/shared/constants/routePath';
import {
  createLinkSchema,
  type CreateLinkData,
  type CreateLinkValidationError,
} from '../components/createLink/createLinkValidation';
import { ViewContainer } from '../components/ViewContainer';
import { ViewHeader } from '../components/ViewHeader';
import { LinkService } from '../services/links/linkService';

export const CreateLinkView = () => {
  const hostname = window.location.hostname;
  const formRef = useRef<HTMLFormElement>(null);

  const { translate: t } = useLanguage();
  const navitate = useNavigate();

  const [stateValidation, formAction, isPending] = useActionState(
    async (_: unknown, queryData: FormData) => {
      const formData = Object.fromEntries(queryData) as CreateLinkData;
      const result = createLinkSchema.safeParse(formData);

      if (!result.success && result.error) {
        const errors = z.treeifyError(result.error)
          .properties as CreateLinkValidationError;
        return errors;
      }

      const { destination, ...rest } = result.data;

      const { success } = await LinkService.createLink({
        ...rest,
        destination: destination,
        domain: hostname,
      });

      if (success) formRef.current?.reset();
    },
    null
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget as HTMLFormElement));
    });
  };

  return (
    <>
      <ViewContainer>
        <Head title={t('links')} />
        <ViewHeader title={t('createLink.form.title')} />

        <section className='relative flex flex-col items-center'>
          <div className='w-full max-w-3xl'>
            <Card className='w-full'>
              <CardContent>
                <form noValidate ref={formRef} onSubmit={onSubmit}>
                  <div className='grid gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='destination'>
                        {t('createLink.form.label.destination')}
                      </Label>
                      <CustomInput
                        id='destination'
                        name='destination'
                        type='text'
                        placeholder='https://example.com/my-long-url'
                        hasError={stateValidation?.destination != undefined}
                        errors={stateValidation?.destination?.errors}
                        disabled={isPending}
                      />
                    </div>
                    <div className='grid gap-3'>
                      <Label htmlFor='title'>
                        {t('title')}
                        <span className='lowercase font-normal'>
                          {t('optional')}
                        </span>
                      </Label>
                      <CustomInput
                        id='title'
                        name='title'
                        type='text'
                        hasError={stateValidation?.title != undefined}
                        errors={stateValidation?.title?.errors}
                      />
                    </div>
                    <div>
                      <CardTitle className='text-xl mb-3'>
                        {t('shortlink')}
                      </CardTitle>
                      <div className='grid md:grid-cols-[1fr_20px_1fr] gap-3'>
                        <div className='grid gap-3'>
                          <Label htmlFor='domain'>
                            {t('createLink.form.label.domain')}
                          </Label>
                          <input
                            type='hidden'
                            id='domain'
                            name='domain'
                            value={hostname}
                            readOnly
                          />
                          <Input
                            type='text'
                            placeholder='example.com'
                            value={hostname}
                            disabled
                          />
                        </div>
                        <div className='hidden md:flex justify-center items-center pt-6'>
                          /
                        </div>
                        <div className='grid gap-3'>
                          <Label htmlFor='customBackHalf'>
                            {t('createLink.form.label.custom-back-half')}
                            <span className='lowercase font-normal'>
                              {t('optional')}
                            </span>
                          </Label>
                          <CustomInput
                            id='customBackHalf'
                            name='customBackHalf'
                            type='text'
                            hasError={
                              stateValidation?.customBackHalf != undefined
                            }
                            errors={stateValidation?.customBackHalf?.errors}
                            disabled={isPending}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </ViewContainer>

      <footer className='bg-sidebar border-sidebar-border border-t flex justify-center p-3 sm:p-4'>
        <div className='w-screen max-w-3xl flex justify-between'>
          <Button variant='outline' onClick={() => navitate(RoutePath.Links)}>
            {t('cancel')}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              formRef.current?.requestSubmit();
            }}
            className='w-fit'
          >
            {t('createLink.button.create')}
          </Button>
        </div>
      </footer>
    </>
  );
};
