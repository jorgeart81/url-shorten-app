import { NavLink } from 'react-router';

import { RoutePath } from '@/shared/constants/routePath';

export const FormFooter = () => {
  return (
    <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
      By clicking continue, you agree to our{' '}
      <NavLink to={RoutePath.TermsAndConditions}>Terms of Service</NavLink> and{' '}
      <a href='#'>Privacy Policy</a>.
    </div>
  );
};
