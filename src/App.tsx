import { BrowserRouter, Route, Routes } from 'react-router';

import { ErrorBoundary } from './components/ErrorBoundary';
import { FallbackView } from './components/FallbackView';
import { NotFoundView } from './components/NotFoundView';
import { AuthModule } from './modules/auth/AuthModule';
import { DashboardLayout } from './modules/dashboard/components/DashboardLayout';
import { AccountView } from './modules/dashboard/views/AccountView';
import { CreateLinkView } from './modules/dashboard/views/CreateLinkView';
import { HomeView } from './modules/dashboard/views/HomeView';
import { LinkDetailsView } from './modules/dashboard/views/LinkDetailsView';
import { LinkEditView } from './modules/dashboard/views/LinkEditView';
import { LinkView } from './modules/dashboard/views/LinkView';
import { RedirectView } from './modules/dashboard/views/RedirectView';
import { LandingLayout } from './modules/landing/components/LandingLayout';
import { LandingView } from './modules/landing/views/LandingView';

function App() {
  return (
    <ErrorBoundary fallback={<FallbackView />}>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path='/' element={<LandingView />} />
          </Route>
          <Route path='/auth/*' element={<AuthModule />} />
          <Route path='/:backHalf' element={<RedirectView />} />
          <Route path='*' element={<NotFoundView />} />

          {/* region: Authenticated routes */}
          <Route element={<DashboardLayout />}>
            <Route path='/home' element={<HomeView />} />
            <Route path='/links' element={<LinkView />} />
            <Route path='/links/create' element={<CreateLinkView />} />
            <Route
              path='/links/:backHalf/details'
              element={<LinkDetailsView />}
            />
            <Route path='/links/:backHalf/edit' element={<LinkEditView />} />
            <Route path='/account' element={<AccountView />} />
          </Route>
          {/* end region*/}
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
