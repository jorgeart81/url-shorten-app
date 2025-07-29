import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthModule } from './modules/auth/AuthModule';
import { NotFoundView } from './components/NotFoundView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to='/auth' />} />
        <Route path='/auth/*' element={<AuthModule />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
