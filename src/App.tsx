import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthModule } from './modules/auth/AuthModule';
import { NotFoundView } from './components/NotFoundView';
import { HomeView } from './modules/dashboard/views/HomeView';
import { DashboardLayout } from './modules/dashboard/components/DashboardLayout';
import { LinkView } from './modules/dashboard/views/LinkView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to='/auth' />} />
        <Route path='/auth/*' element={<AuthModule />} />
        <Route path='*' element={<NotFoundView />} />

        <Route element={<DashboardLayout />}>
          <Route path='/home' element={<HomeView />} />
          <Route path='/links' element={<LinkView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
