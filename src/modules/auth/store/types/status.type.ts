export type Status =
  | 'authenticated'
  | 'authenticating'
  | 'registering'
  | 'checking'
  | 'sessionExpired'
  | 'unauthorized'
  | 'unconfirmedEmail';
