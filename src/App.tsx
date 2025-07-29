import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from './modules/auth/AuthLayout';
import { LoginForm } from './modules/auth/components/LoginForm/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to='/auth/login' />} />
        <Route path='/auth' element={<AuthLayout />}>
          <Route index path='login' element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
