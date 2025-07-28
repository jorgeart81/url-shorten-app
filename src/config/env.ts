import { z } from 'zod/v4';

// Environment schema definition
const envSchema = z.object({
  PUBLIC_API_URL: z.string(),
  PUBLIC_API_PORT: z.number(),
  PUBLIC_APP_NAME: z.string().default('URL Shorten'),
  PUBLIC_DEBUG_MODE: z
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
  apiUrl: validatedEnv.PUBLIC_API_URL,
  apiPort: validatedEnv.PUBLIC_API_PORT,
  apiBaseUrl: String(
    `${validatedEnv.PUBLIC_API_URL}:${validatedEnv.PUBLIC_API_PORT}/api`
  ),
  appName: validatedEnv.PUBLIC_APP_NAME,
  debugMode: validatedEnv.PUBLIC_DEBUG_MODE,
} as const;

// Export types for TypeScript
export type Environment = typeof env;
