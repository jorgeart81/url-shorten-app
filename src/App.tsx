import { BrowserRouter, Route, Routes } from 'react-router';

import { ErrorBoundary } from './components/ErrorBoundary';
import { FallbackView } from './components/FallbackView';
import { NotFoundView } from './components/NotFoundView';
import { AuthModuleRoutes } from './modules/auth/AuthModule';
import { DashboardLayout } from './modules/dashboard/components/DashboardLayout';
import { AccountView } from './modules/dashboard/views/AccountView';
import { CreateLinkView } from './modules/dashboard/views/CreateLinkView';
import { HomeView } from './modules/dashboard/views/HomeView';
import { LinkDetailsView } from './modules/dashboard/views/LinkDetailsView';
import { LinkEditView } from './modules/dashboard/views/LinkEditView';
import { LinkView } from './modules/dashboard/views/LinkView';
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
          <Route element={<DashboardLayout />}>
            <Route path={RoutePath.Home} element={<HomeView />} />
            <Route path={RoutePath.Links} element={<LinkView />} />
            <Route path={RoutePath.CreateLink} element={<CreateLinkView />} />
            <Route
              path={`${RoutePath.Links}/:backHalf/details`}
              element={<LinkDetailsView />}
            />
            <Route
              path={`${RoutePath.Links}/:backHalf/edit`}
              element={<LinkEditView />}
            />
            <Route path={RoutePath.Account} element={<AccountView />} />
          </Route>
          {/* end region*/}

          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
