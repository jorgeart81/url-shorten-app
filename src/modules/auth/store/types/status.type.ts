export type Status =
  | 'authenticated'
  | 'authenticating'
  | 'checking'
  | 'sessionExpired'
  | 'unauthorized'
  | 'unconfirmedEmail';
