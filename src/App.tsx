import { BrowserRouter, Route, Routes } from 'react-router';

import { ErrorBoundary } from './components/ErrorBoundary';
import { FallbackView } from './components/FallbackView';
import { AuthModuleRoutes } from './modules/auth/AuthModule';
import { ProtectedRoute } from './modules/dashboard/components/ProtectedRoute';
import { DashboardModule } from './modules/dashboard/DashboardModule';
import { LandingLayout } from './modules/landing/components/LandingLayout';
import { LandingView } from './modules/landing/views/LandingView';
import { TermsAndConditions } from './modules/landing/views/TermsAndConditions';
import { RoutePath } from './shared/constants/routePath';

function App() {
  return (
    <ErrorBoundary fallback={<FallbackView />}>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path='/' element={<LandingView />} />
            <Route
              path={RoutePath.TermsAndConditions}
              element={<TermsAndConditions />}
            />
          </Route>

          <Route path={`${RoutePath.Auth}/*`} element={<AuthModuleRoutes />} />

          {/* region: Authenticated routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='*' element={<DashboardModule />} />
          </Route>
          {/* end region*/}
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
