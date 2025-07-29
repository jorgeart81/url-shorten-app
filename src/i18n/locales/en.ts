import type { Translation } from '../types';

export const en: Translation = {
  // Basic translations
  welcome: 'Hello world!',
  clickMe: 'Click me',
  title: 'URL Shortener',

  // Login Form
  'loginForm.title': 'Sign In',
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
  'registerForm.login': 'Sign In',
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

  // Resend Email Confirmation
  'resendEmailConfirmation.title': 'Verify your email',
  'resendEmailConfirmation.description':
    'We have sent a verification email to your email address.\nIf you cannot find it, check your spam folder.\nStill not received? Click the button to resend it.',
  'resendEmailConfirmation.sentSuccessfully':
    'We have sent you a new verification email. Please check your inbox.',
  'resendEmailConfirmation.tooManyRequests':
    'You have reached the request limit. Try again in 15 minutes.',
  'resendEmailConfirmation.buttonResend': 'Resend Code',
  'resendEmailConfirmation.buttonExit': 'Sign Out',

  // Email Verification
  'emailVerification.successTitle': 'Email verified!',
  'emailVerification.successDescription':
    'Your email address has been successfully verified.',
  'emailVerification.successActionMessage': 'You can now sign in to your account.',
  'emailVerification.successActionButton': 'Go to sign in',
  'emailVerification.errorTitle': 'Invalid or expired code',
  'emailVerification.errorDescription':
    'The verification link is not valid or has already been used.',
  'emailVerification.errorHelp': "Didn't receive the email or the link expired?",
  'emailVerification.errorAction': 'Resend verification',
};
