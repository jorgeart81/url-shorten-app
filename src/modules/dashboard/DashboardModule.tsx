import { Route, Routes } from 'react-router';

import { NotFoundView } from '@/components/NotFoundView';
import { RoutePath } from '@/shared/constants/routePath';
import { DashboardLayout } from './components/DashboardLayout';
import { AccountView } from './views/AccountView';
import { CreateLinkView } from './views/CreateLinkView';
import { HomeView } from './views/HomeView';
import { LinkDetailsView } from './views/LinkDetailsView';
import { LinkEditView } from './views/LinkEditView';
import { LinkView } from './views/LinkView';

export const DashboardModule = () => {
  return (
    <Routes>
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

      <Route path='*' element={<NotFoundView />} />
    </Routes>
  );
};
