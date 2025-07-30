import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { ThemeProvider } from './components/theme/ThemeProvider.tsx';
import { Toaster } from './components/ui/sonner.tsx';

import './i18n/config.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position='top-center' />
    </ThemeProvider>
  </StrictMode>
);
