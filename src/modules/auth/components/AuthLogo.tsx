import { type FC } from 'react';
import { NavLink } from 'react-router';

export const AuthLogo: FC = () => {
  return (
    <NavLink
      to='/'
      viewTransition
      className='flex items-center gap-2 self-center font-medium'
    >
      <img src='/favicon.svg' alt='favicon' className='size-6' />
      Url Shorten
    </NavLink>
  );
};
