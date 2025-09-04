import type { Translation } from '../types';

export const es: Translation = {
  // Basic translations
  appTitle: 'Acortador de URLs',
  shortlink: 'Enlace corto',
  title: 'Título',
  untitled: 'Sin título',
  welcome: '¡Bienvenido!',
  yourPlatform: 'Tu Plataforma',

  // Common actions
  cancel: 'Cancelar',
  clickMe: 'Haz clic',
  continue: 'Continuar',
  copied: 'Copiado',
  copy: 'Copiar',
  delete: 'Eliminar',
  edit: 'Editar',
  exit: 'Salir',
  more: 'Más',
  moreOptions: 'Más opciones',
  optional: 'Opcional',
  redirect: 'Redirección',
  save: 'Guardar',
  selected: 'Selecionado',
  share: 'Compartir',
  'view.link.details': 'Ver detalles del enlace',

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
  'validations.passwordRegex':
    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.',

  // Resend Email Session Expired
  'resendEmailSessionExpired.title': 'Sesión expirada',
  'resendEmailSessionExpired.message':
    'El tiempo para reenviar el código de confirmación ha expirado. Por favor, inicia sesión nuevamente para generar uno nuevo.',
  'resendEmailSessionExpired.buttonExit': 'Cerrar Sesión',

  // Email Resend
  'emailResend.title': 'Verifica tu correo electrónico',
  'emailResend.description':
    'Hemos enviado un correo de verificación a tu email.\nSi no lo encuentras, revisa tu carpeta de spam.\n¿Aún no lo recibes? Haz clic en el botón para reenviarlo.',
  'emailResend.success':
    'Te hemos enviado un nuevo correo de verificación. Por favor revisa tu bandeja de entrada.',
  'emailResend.tooMany':
    'Has alcanzado el límite de solicitudes. Inténtalo de nuevo en 15 minutos.',
  'emailResend.buttonSend': 'Reenviar Código',
  'emailResend.buttonExit': 'Cerrar Sesión',

  // Email Verification
  'emailVerification.successTitle': '¡Correo verificado!',
  'emailVerification.successDescription':
    'Tu dirección de correo electrónico ha sido verificada con éxito.',
  'emailVerification.successActionMessage':
    'Ya puedes iniciar sesión en tu cuenta.',
  'emailVerification.successActionButton': 'Ir al inicio de sesión',
  'emailVerification.errorTitle': 'Código inválido o expirado',
  'emailVerification.errorDescription':
    'El enlace de verificación no es válido o ya fue usado.',
  'emailVerification.errorHelp': '¿No recibiste el correo o el enlace expiró?',
  'emailVerification.errorAction': 'Reenviar verificación',

  // Errors
  'errorBoundary.title': '¡Uy! Ocurrió un error',
  'errorBoundary.description':
    'No pudimos cargar esta sección. Intenta recargar la página.',
  'errorBoundary.reloadButton': 'Recargar',
  'errorAlert.notFound':
    'Lo sentimos, hemos encontrado un error. Por favor, espera un momento y vuelve a intentarlo.',

  // Create Link
  'createLink.button.create': 'Crear link',
  'createLink.destination.validation':
    'Necesitaremos una URL válida, como "https://yourbrnd.co/niceurl"',
  'createLink.form.subtitle':
    'Puedes crear {{linkCount}} enlaces más este mes.',
  'createLink.form.title': 'Crear un enlace',
  'createLink.form.label.custom-back-half': 'Ruta personalizada',
  'createLink.form.label.destination': 'Destino',
  'createLink.form.label.domain': 'Dominio',
  'quick.create': 'Creación rápida',

  'validation.string.maxLength':
    'El campo debe tener {{maxLength}} caracteres como máximo.',
  'validation.string.maxLength.generic':
    'El campoto tiene más caracteres de los permitidos.',
  'linksView.noResults.title': 'No se encontraron resultados',
  'linksView.noResults.description':
    'Intenta ajustar tu búsqueda, los filtros, o {{hiddenLink}} en su lugar.',
  'linksView.noResults.hiddenLink': 'intenta buscar enlaces ocultos',
  'linksView.noResults.activeLink': 'intenta buscar enlaces activos',

  // Update Link
  'change.destination.url': 'Cambiar la URL de destino',

  // Code Errors
  'AUTH_ERROR.description':
    'Ocurrió un problema durante el proceso de autenticación.',
  'AUTH_ERROR.title': 'Error de autenticación',
  'AUTH_FAILED.title': 'Autenticación fallida',
  'AUTH_FAILED.description':
    'Por favor, verifica tu dirección de email y contraseña e inténtalo de nuevo.',
  'EXPIRED_TOKEN.title': 'Sesión expirada',
  'EXPIRED_TOKEN.description':
    'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  'INVALID_CREDENTIALS.title': 'Credenciales inválidas',
  'INVALID_CREDENTIALS.description':
    'Las credenciales proporcionadas no son correctas.',
  'INVALID_TOKEN.title': 'Token inválido',
  'INVALID_TOKEN.description':
    'El token proporcionado no es válido o ha expirado.',
  'LOGOUT_FAILED.title': 'Error al cerrar sesión',
  'LOGOUT_FAILED.description':
    'No se pudo cerrar la sesión correctamente. Intenta nuevamente.',
  'USER_NOT_FOUND.title': 'Usuario no encontrado',
  'USER_NOT_FOUND.description':
    'No se encontró un usuario con la información proporcionada.',
  'EMAIL_ALREADY_REGISTERED.title': 'Email ya registrado',
  'EMAIL_ALREADY_REGISTERED.description':
    'Ya existe una cuenta asociada a este email. Por favor, inicia sesión o utiliza otro email.',
  'RESENCODE_EXPIRED.title': 'Sesión expirada',
  'RESENCODE_EXPIRED.description':
    'La sesión ha expirado. Por favor, inicia sesión nuevamente.',
  'ACCESS_DENIED.title': 'Acceso denegado',
  'ACCESS_DENIED.description': 'No tienes permiso para acceder a este recurso.',
  'NETWORK_ERROR.title': 'Error de red',
  'NETWORK_ERROR.description':
    'Comprueba tu conexión a internet y vuelve a intentarlo.',
  'INVALID_REQUEST.title': 'Solicitud inválida',
  'INVALID_REQUEST.description':
    'La solicitud enviada no es válida. Por favor, revisa los datos e inténtalo de nuevo.',
  'PAYLOAD_EXPIRED.description':
    'La información enviada ha expirado. Por favor, vuelve a intentarlo.',
  'PAYLOAD_EXPIRED.title': 'Carga expirada',
  'TOO_MANY_REQUESTS.title': 'Demasiadas solicitudes',
  'TOO_MANY_REQUESTS.description':
    'Has realizado demasiadas solicitudes en poco tiempo. Por favor, espera un momento antes de intentarlo nuevamente.',
  'UNKNOWN.title': 'Error desconocido',
  'UNKNOWN.description':
    'Ha ocurrido un error inesperado. Intenta nuevamente más tarde.',

  // Edit
  active: 'Activo',
  inactive: 'Oculto',
  activate: 'Activar',
  deactivate: 'Desactivar',
  destinationURL: 'URL de destino',
  optionalDetails: 'Detalles opcionales',

  sendingEmail: 'Enviando correo…',
  sessionExpirationWarning: 'Tu sesión finalizará en 1 minuto.',

  // Dashboard
  account: 'Cuenta',
  backToList: 'Volver a la lista',
  home: 'Inicio',
  link: 'Enlace',
  links: 'Enlaces',
  logOut: 'Cerrar sesión',

  // Landing
  logIn: 'Iniciar sesión',
  signUp: 'Regístrate',
};
