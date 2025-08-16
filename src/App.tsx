import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { NotFoundView } from './components/NotFoundView';
import { AuthModule } from './modules/auth/AuthModule';
import { DashboardLayout } from './modules/dashboard/components/DashboardLayout';
import { CreateLinkView } from './modules/dashboard/views/CreateLinkView';
import { HomeView } from './modules/dashboard/views/HomeView';
import { LinkDetailsView } from './modules/dashboard/views/LinkDetailsView';
import { LinkView } from './modules/dashboard/views/LinkView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FallbackView } from './components/FallbackView';
import { RedirectView } from './modules/dashboard/views/RedirectView';
import { LinkEditView } from './modules/dashboard/views/LinkEditView';

function App() {
  return (
    <ErrorBoundary fallback={<FallbackView />}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to='/auth' />} />
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
          </Route>
          {/* end region*/}
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
