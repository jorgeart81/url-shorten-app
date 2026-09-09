import { z } from 'zod/v4';

// Environment schema definition
const envSchema = z.object({
  VITE_API_BASE_URL: z.string(),
  VITE_APP_NAME: z.string().default('Url Shorten'),
  VITE_REDIRECTION_DOMAIN: z.string(),
  VITE_DEBUG_MODE: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
});

// Validate environment variables
const envResult = envSchema.safeParse(import.meta.env);
if (!envResult.success) {
  console.error(
    '❌ Invalid environment variables:',
    z.treeifyError(envResult.error)
  );
  throw new Error('Invalid environment configuration');
}

const validatedEnv = envResult.data;

// Export validated environment
export const env = {
  apiBaseUrl: validatedEnv.VITE_API_BASE_URL,
  appName: validatedEnv.VITE_APP_NAME,
  redirectionDomain: validatedEnv.VITE_REDIRECTION_DOMAIN,
  debugMode: validatedEnv.VITE_DEBUG_MODE,
} as const;

// Export types for TypeScript
export type Environment = typeof env;
