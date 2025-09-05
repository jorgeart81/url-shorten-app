import type { Translation } from '../types';

export const en: Translation = {
  // Basic translations
  appTitle: 'URL Shortener',
  shortlink: 'Short link',
  title: 'Title',
  untitled: 'Untitled',
  welcome: 'Hello world!',
  yourPlatform: 'Your Platform',

  // Common actions
  cancel: 'Cancel',
  clickMe: 'Click me',
  continue: 'Continue',
  copied: 'Copied',
  copy: 'Copy',
  delete: 'Delete',
  edit: 'Edit',
  exit: 'Exit',
  more: 'More',
  moreOptions: 'More options',
  optional: 'Optional',
  redirect: 'Redirect',
  save: 'Save',
  selected: 'Selected',
  share: 'Share',
  'view.link.details': 'View link details',

  // Login Form
  'loginForm.title': 'Log In',
  'loginForm.input.emailLabel': 'Email address',
  'loginForm.input.passwordLabel': 'Password',
  'loginForm.forgotPassword': 'Forgot your password?',
  'loginForm.rememberMe': 'Remember me',
  'loginForm.login': 'Sign In',
  'loginForm.dontHaveAccount': "Don't have an account?",
  'loginForm.signUp': 'Sign Up',

  // Register Form
  'registerForm.title': 'Sign Up',
  'registerForm.input.emailLabel': 'Email address',
  'registerForm.input.passwordLabel': 'Password',
  'registerForm.forgotPassword': 'Forgot your password?',
  'registerForm.rememberMe': 'Remember me',
  'registerForm.login': 'Log In',
  'registerForm.haveAccount': 'Already have an account?',
  'registerForm.create': 'Sign Up',

  // Validations
  'validations.invalidEmail': 'Invalid email',
  'validations.passwordMin': 'Password must be at least 8 characters',
  'validations.passwordRegex':
    'Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character.',

  // Resend Email Session Expired
  'resendEmailSessionExpired.title': 'Session Expired',
  'resendEmailSessionExpired.message':
    'The time to resend the confirmation code has expired. Please sign in again to generate a new one.',
  'resendEmailSessionExpired.buttonExit': 'Sign Out',

  // Email Resend
  'emailResend.title': 'Verify your email',
  'emailResend.description':
    'We have sent a verification email to your email address.\nIf you cannot find it, check your spam folder.\nStill not received? Click the button to resend it.',
  'emailResend.success':
    'We have sent you a new verification email. Please check your inbox.',
  'emailResend.tooMany':
    'You have reached the request limit. Try again in 15 minutes.',
  'emailResend.buttonSend': 'Resend Code',
  'emailResend.buttonExit': 'Sign Out',

  // Email Verification
  'emailVerification.successTitle': 'Email verified!',
  'emailVerification.successDescription':
    'Your email address has been successfully verified.',
  'emailVerification.successActionMessage':
    'You can now sign in to your account.',
  'emailVerification.successActionButton': 'Go to sign in',
  'emailVerification.errorTitle': 'Invalid or expired code',
  'emailVerification.errorDescription':
    'The verification link is not valid or has already been used.',
  'emailVerification.errorHelp':
    "Didn't receive the email or the link expired?",
  'emailVerification.errorAction': 'Resend verification',

  // Errors
  'errorBoundary.title': 'Oops! Something went wrong',
  'errorBoundary.description':
    "We couldn't load this section. Try reloading the page.",
  'errorBoundary.reloadButton': 'Reload',
  'errorAlert.notFound':
    "Sorry, we've encountered an error. Give us just a moment and try again.",

  // Create Link
  'createLink.button.create': 'Create link',
  'createLink.destination.validation':
    'We\'ll need a valid URL, like "https://yourbrnd.co/niceurl"',
  'createLink.form.subtitle':
    'You can create {{linkCount}} more links this month.',
  'createLink.form.title': 'Create a link',
  'createLink.form.label.custom-back-half': 'Custom back-half',
  'createLink.form.label.destination': 'Destination',
  'createLink.form.label.domain': 'Domain',
  'quick.create': 'Quick create',

  // Update Link
  'change.destination.url': "Change link's destination URL",

  // Validation messages
  'validation.string.maxLength':
    'The field must have {{maxLength}} characters at most.',
  'validation.string.maxLength.generic':
    'The field has more characters than allowed.',

  // Links View
  'linksView.noResults.title': 'No results found',
  'linksView.noResults.description':
    'Try adjusting your search, filters, or {{hiddenLink}} instead.',
  'linksView.noResults.hiddenLink': 'try searching for hidden links',
  'linksView.noResults.activeLink': 'try searching for active links',

  // Code Errors
  'ACCESS_DENIED.description':
    'You do not have permission to access this resource.',
  'ACCESS_DENIED.title': 'Access Denied',
  'AUTH_ERROR.description':
    'A problem occurred during the authentication process.',
  'AUTH_ERROR.title': 'Authentication Error',
  'AUTH_FAILED.description':
    'Please verify your email address and password and try again.',
  'AUTH_FAILED.title': 'Authentication Failed',
  'EMAIL_ALREADY_REGISTERED.description':
    'An account already exists with this email. Please sign in or use a different email.',
  'EMAIL_ALREADY_REGISTERED.title': 'Email Already Registered',
  'EXPIRED_TOKEN.description':
    'Your session has expired. Please sign in again.',
  'EXPIRED_TOKEN.title': 'Session Expired',
  'INVALID_CREDENTIALS.description':
    'The provided credentials are not correct.',
  'INVALID_CREDENTIALS.title': 'Invalid Credentials',
  'INVALID_REQUEST.description':
    'The sent request is not valid. Please check the data and try again.',
  'INVALID_REQUEST.title': 'Invalid Request',
  'INVALID_TOKEN.description':
    'The provided token is not valid or has expired.',
  'INVALID_TOKEN.title': 'Invalid Token',
  'LOGOUT_FAILED.description': 'Could not sign out properly. Please try again.',
  'LOGOUT_FAILED.title': 'Sign Out Error',
  'NETWORK_ERROR.description': 'Check your internet connection and try again.',
  'NETWORK_ERROR.title': 'Network Error',
  'PAYLOAD_EXPIRED.description':
    'The sent information has expired. Please try again.',
  'PAYLOAD_EXPIRED.title': 'Payload Expired',
  'RESENCODE_EXPIRED.description':
    'The session has expired. Please sign in again.',
  'RESENCODE_EXPIRED.title': 'Session Expired',
  'TOO_MANY_REQUESTS.description':
    'You have made too many requests in a short time. Please wait a moment before trying again.',
  'TOO_MANY_REQUESTS.title': 'Too Many Requests',
  'UNKNOWN.description':
    'An unexpected error has occurred. Please try again later.',
  'UNKNOWN.title': 'Unknown Error',
  'USER_NOT_FOUND.description': 'No user found with the provided information.',
  'USER_NOT_FOUND.title': 'User Not Found',

  sendingEmail: 'Sending email…',
  sessionExpirationWarning: 'Your session will expire in 1 minute.',

  // Edit Link
  active: 'Active',
  inactive: 'Inactive',
  activate: 'Activate',
  deactivate: 'Deactivate',
  destinationURL: 'Destintion URL',
  optionalDetails: 'Optional details',

  // Dashboard
  account: 'Account',
  backToList: 'Back to list',
  home: 'Home',
  link: 'Link',
  links: 'Links',
  logOut: 'Log out',

  // Landing
  logIn: 'Log In',
  signUp: 'Sign Up',
  myAccount: 'My Account',
};
