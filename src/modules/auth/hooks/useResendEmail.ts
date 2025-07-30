import { useContext } from 'react';
import { ResendEmailContext } from '../components/ResendEmail/context/resendEmailContext';

export const useResendEmail = () => {
  const context = useContext(ResendEmailContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ResendEmailProvider');

  return context;
};
