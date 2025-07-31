import { Navigate, Route, Routes } from 'react-router';

import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { FallbackView } from '@/components/FallbackView.tsx';
import { NotFoundView } from '@/components/NotFoundView.tsx';
import { AuthLayout } from './components/AuthLayout';
import { EmailConfirmationView } from './views/EmailConfirmationView.tsx';
import { LoginView } from './views/LoginView.tsx';
import { ResendView } from './views/ResendView.tsx';
import { SignupView } from './views/SignupView.tsx';

export const AuthModule = () => {
  return (
    <ErrorBoundary fallback={<FallbackView />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to='login' replace />} />
          <Route path='login' element={<LoginView />} />
          <Route path='signup' element={<SignupView />} />
        </Route>

        <Route path='confirm-Email' element={<EmailConfirmationView />} />
        <Route path='resend-confirmation' element={<ResendView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </ErrorBoundary>
  );
};
