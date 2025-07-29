import { useContext } from 'react';
import { ResendEmailContext } from '../components/ResendEmail/resendEmailContext';

export const useResendEmail = () => {
  const context = useContext(ResendEmailContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ResendEmailProvider');

  return context;
};
