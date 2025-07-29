import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { AuthLayout } from './components/AuthLayout';
import { LoginForm } from './components/LoginForm/LoginForm';
import { SignupForm } from './components/SignupForm/SignupForm';
import { Spinner } from '@/components/ui/spinner.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { FallbackView } from '@/components/FallbackView.tsx';
import { NotFoundView } from '@/components/NotFoundView.tsx';

const LazyResendingEmail = lazy(
  () => import('./components/ResendEmail/ResendingEmail.tsx')
);

export const AuthModule = () => {
  return (
    <ErrorBoundary fallback={<FallbackView />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to='login' replace />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='signup' element={<SignupForm />} />
          <Route
            element={
              <Suspense
                fallback={
                  <div className='relative content-center size-full'>
                    <Spinner
                      loading={true}
                      size='md'
                      className='dark:bg-white bg-black absolute'
                    />
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            }
          />
          <Route path='resend-confirmation' element={<LazyResendingEmail />} />
        </Route>
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </ErrorBoundary>
  );
};
