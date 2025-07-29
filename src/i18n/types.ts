export interface Translation {
  // Basic translations
  welcome: string;
  clickMe: string;
  title: string;

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

  // Resend Email Confirmation
  'resendEmailConfirmation.title': string;
  'resendEmailConfirmation.description': string;
  'resendEmailConfirmation.sentSuccessfully': string;
  'resendEmailConfirmation.tooManyRequests': string;
  'resendEmailConfirmation.buttonResend': string;
  'resendEmailConfirmation.buttonExit': string;

  // Email Verification
  'emailVerification.successTitle': string;
  'emailVerification.successDescription': string;
  'emailVerification.successActionMessage': string;
  'emailVerification.successActionButton': string;
  'emailVerification.errorTitle': string;
  'emailVerification.errorDescription': string;
  'emailVerification.errorHelp': string;
  'emailVerification.errorAction': string;
}

export type TranslationKeys = keyof Translation;
