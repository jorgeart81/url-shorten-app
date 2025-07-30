import { Navigate, Route, Routes } from 'react-router';

import { NotFoundView } from '@/components/NotFoundView.tsx';
import { AuthLayout } from './components/AuthLayout';
import { LoginForm } from './components/LoginForm/LoginForm';
import { ResendView } from './components/ResendEmail/ResendView.tsx';
import { SignupForm } from './components/SignupForm/SignupForm';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { FallbackView } from '@/components/FallbackView.tsx';
import { EmailConfirmation } from './components/EmailConfirmation.tsx';

export const AuthModule = () => {
  return (
    <ErrorBoundary fallback={<FallbackView />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to='login' replace />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='signup' element={<SignupForm />} />
        </Route>

        <Route path='confirm-Email' element={<EmailConfirmation />} />
        <Route path='resend-confirmation' element={<ResendView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </ErrorBoundary>
  );
};
