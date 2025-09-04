export interface Translation {
  // Basic translations
  appTitle: string;
  shortlink: string;
  title: string;
  untitled: string;
  welcome: string;
  yourPlatform: string;

  // Common actions
  cancel: string;
  clickMe: string;
  continue: string;
  copied: string;
  copy: string;
  delete: string;
  edit: string;
  exit: string;
  more: string;
  moreOptions: string;
  optional: string;
  redirect: string;
  save: string;
  selected: string;
  share: string;
  'view.link.details': string;

  // Login Form
  'loginForm.title': string;
  'loginForm.input.emailLabel': string;
  'loginForm.input.passwordLabel': string;
  'loginForm.forgotPassword': string;
  'loginForm.rememberMe': string;
  'loginForm.login': string;
  'loginForm.dontHaveAccount': string;
  'loginForm.signUp': string;

  // Register Form
  'registerForm.title': string;
  'registerForm.input.emailLabel': string;
  'registerForm.input.passwordLabel': string;
  'registerForm.forgotPassword': string;
  'registerForm.rememberMe': string;
  'registerForm.login': string;
  'registerForm.haveAccount': string;
  'registerForm.create': string;

  // Validations
  'validations.invalidEmail': string;
  'validations.passwordMin': string;
  'validations.passwordRegex': string;

  // Resend Email Session Expired
  'resendEmailSessionExpired.title': string;
  'resendEmailSessionExpired.message': string;
  'resendEmailSessionExpired.buttonExit': string;

  // Email Resend
  'emailResend.title': string;
  'emailResend.description': string;
  'emailResend.success': string;
  'emailResend.tooMany': string;
  'emailResend.buttonSend': string;
  'emailResend.buttonExit': string;

  // Email Verification
  'emailVerification.successTitle': string;
  'emailVerification.successDescription': string;
  'emailVerification.successActionMessage': string;
  'emailVerification.successActionButton': string;
  'emailVerification.errorTitle': string;
  'emailVerification.errorDescription': string;
  'emailVerification.errorHelp': string;
  'emailVerification.errorAction': string;

  // Errors
  'errorBoundary.title': string;
  'errorBoundary.description': string;
  'errorBoundary.reloadButton': string;
  'errorAlert.notFound': string;

  // Create Link
  'createLink.button.create': string;
  'createLink.destination.validation': string;
  'createLink.form.subtitle': string;
  'createLink.form.title': string;
  'createLink.form.label.custom-back-half': string;
  'createLink.form.label.destination': string;
  'createLink.form.label.domain': string;
  'quick.create': string;

  // Update Link
  'change.destination.url': string;

  // Validation messages
  'validation.string.maxLength': string;
  'validation.string.maxLength.generic': string;

  // Links View
  'linksView.noResults.title': string;
  'linksView.noResults.description': string;
  'linksView.noResults.hiddenLink': string;
  'linksView.noResults.activeLink': string;

  // Code Errors
  'ACCESS_DENIED.description': string;
  'ACCESS_DENIED.title': string;
  'AUTH_ERROR.description': string;
  'AUTH_ERROR.title': string;
  'AUTH_FAILED.description': string;
  'AUTH_FAILED.title': string;
  'EMAIL_ALREADY_REGISTERED.description': string;
  'EMAIL_ALREADY_REGISTERED.title': string;
  'EXPIRED_TOKEN.description': string;
  'EXPIRED_TOKEN.title': string;
  'INVALID_CREDENTIALS.description': string;
  'INVALID_CREDENTIALS.title': string;
  'INVALID_REQUEST.description': string;
  'INVALID_REQUEST.title': string;
  'INVALID_TOKEN.description': string;
  'INVALID_TOKEN.title': string;
  'LOGOUT_FAILED.description': string;
  'LOGOUT_FAILED.title': string;
  'NETWORK_ERROR.description': string;
  'NETWORK_ERROR.title': string;
  'PAYLOAD_EXPIRED.description': string;
  'PAYLOAD_EXPIRED.title': string;
  'RESENCODE_EXPIRED.description': string;
  'RESENCODE_EXPIRED.title': string;
  'TOO_MANY_REQUESTS.description': string;
  'TOO_MANY_REQUESTS.title': string;
  'UNKNOWN.description': string;
  'UNKNOWN.title': string;
  'USER_NOT_FOUND.description': string;
  'USER_NOT_FOUND.title': string;

  // Edit Link
  active: string;
  inactive: string;
  activate: string;
  deactivate: string;
  destinationURL: string;
  optionalDetails: string;

  sendingEmail: string;
  sessionExpirationWarning: string;

  // Dashboard
  account: string;
  backToList: string;
  home: string;
  link: string;
  links: string;
  logOut: string;

  // Landing
  logIn: string;
  signUp: string;
}

export type TranslationKeys = keyof Translation;
