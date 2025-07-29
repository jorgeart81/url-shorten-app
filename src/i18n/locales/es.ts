import type { Translation } from '../types';

export const es: Translation = {
  // Traducciones básicas
  welcome: '¡Hola mundo!',
  clickMe: 'Haz clic',
  title: 'Acortador de URLs',

  // Login Form
  'loginForm.title': 'Iniciar sesión',
  'loginForm.input.emailLabel': 'Dirección de email',
  'loginForm.input.passwordLabel': 'Contraseña',
  'loginForm.forgotPassword': '¿Olvidaste tu contraseña?',
  'loginForm.rememberMe': 'Recuérdame',
  'loginForm.login': 'Inicia sesión',
  'loginForm.dontHaveAccount': '¿No tienes una cuenta?',
  'loginForm.signUp': 'Regístrate',

  // Register Form
  'registerForm.title': 'Regístrate',
  'registerForm.input.emailLabel': 'Dirección de email',
  'registerForm.input.passwordLabel': 'Contraseña',
  'registerForm.forgotPassword': '¿Olvidaste tu contraseña?',
  'registerForm.rememberMe': 'Recuérdame',
  'registerForm.login': 'Inicia sesión',
  'registerForm.haveAccount': '¿Ya tienes una cuenta?',
  'registerForm.create': 'Regístrate',

  // Validations
  'validations.invalidEmail': 'Email inválido',
  'validations.passwordMin': 'La contraseña debe tener al menos 8 caracteres',
  'validations.passwordRegex': 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.',

  // Resend Email Session Expired
  'resendEmailSessionExpired.title': 'Sesión expirada',
  'resendEmailSessionExpired.message': 'El tiempo para reenviar el código de confirmación ha expirado. Por favor, inicia sesión nuevamente para generar uno nuevo.',
  'resendEmailSessionExpired.buttonExit': 'Cerrar Sesión',

  // Resend Email Confirmation
  'resendEmailConfirmation.title': 'Verifica tu correo electrónico',
  'resendEmailConfirmation.description': 'Hemos enviado un correo de verificación a tu email.\nSi no lo encuentras, revisa tu carpeta de spam.\n¿Aún no lo recibes? Haz clic en el botón para reenviarlo.',
  'resendEmailConfirmation.sentSuccessfully': 'Te hemos enviado un nuevo correo de verificación. Por favor revisa tu bandeja de entrada.',
  'resendEmailConfirmation.tooManyRequests': 'Has alcanzado el límite de solicitudes. Inténtalo de nuevo en 15 minutos.',
  'resendEmailConfirmation.buttonResend': 'Reenviar Código',
  'resendEmailConfirmation.buttonExit': 'Cerrar Sesión',

  // Email Verification
  'emailVerification.successTitle': '¡Correo verificado!',
  'emailVerification.successDescription': 'Tu dirección de correo electrónico ha sido verificada con éxito.',
  'emailVerification.successActionMessage': 'Ya puedes iniciar sesión en tu cuenta.',
  'emailVerification.successActionButton': 'Ir al inicio de sesión',
  'emailVerification.errorTitle': 'Código inválido o expirado',
  'emailVerification.errorDescription': 'El enlace de verificación no es válido o ya fue usado.',
  'emailVerification.errorHelp': '¿No recibiste el correo o el enlace expiró?',
  'emailVerification.errorAction': 'Reenviar verificación',
};
