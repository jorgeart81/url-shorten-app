import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from './modules/auth/AuthLayout';
import { LoginForm } from './modules/auth/components/LoginForm/LoginForm';
import { SignupForm } from './modules/auth/components/SignupForm/SignupForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to='/auth/login' />} />
        <Route path='/auth' element={<AuthLayout />}>
          <Route index path='login' element={<LoginForm />} />
          <Route index path='signup' element={<SignupForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
