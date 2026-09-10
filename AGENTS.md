# AGENTS.md

## Developer Commands

- `pnpm dev` - Start dev server
- `pnpm build` - Build (tsc -b && vite build)
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Vitest
- `pnpm test -- <file>` - Run single test file

## Linting & Formatting

- Uses **Biome** (primary) AND **ESLint**
- Run both before committing
- Code style: single quotes, 2 spaces indent

## Testing

- Vitest with jsdom environment
- Tests located in `test/` directory (not src/)
- Path alias: `@` → `./src`

## Package Manager

- pnpm is default (remove pnpm-lock.yaml for npm/yarn)

## Architecture - Feature Modules

```
src/modules/
├── auth/                      # /auth/*
│   ├── AuthModule.tsx         # Router module
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   └── views/
├── dashboard/                 # /home, /links, /account
│   ├── components/
│   ├── services/
│   ├── store/
│   └── views/
└── landing/                    # /
    └── views/
```

- Each module has its own router via `*ModuleRoutes` component
- App.tsx imports and composes all module routes
- Views = page components registered as routes

## Component Organization

**Root level (global reuse):**
- `@src/components/` - Shared UI components
- `@src/components/ui/` - Radix UI customizations
- `@src/components/theme/` - Theme providers
- `@src/hooks/` - Shared hooks (use-mobile, usePagination)
- `@src/services/` - Global services (api, cookies)

**Per module:**
- `modules/*/components/` - Module-specific components
- `modules/*/hooks/` - Module-specific hooks
- `modules/*/services/` - Module-specific services

**Rule:** If used in +1 module → root. If only in one module → inside module.

## Routes

- Landing: `/`, `/terms-and-conditions`
- Auth: `/auth/login`, `/auth/signup`, `/auth/password/reset`, `/auth/confirm-email`, `/auth/resend-confirmation`
- Dashboard: `/home`, `/links`, `/links/create`, `/links/:backHalf/details`, `/links/:backHalf/edit`, `/account`
- Public: `/:backHalf` (redirect)

## ROP Pattern (Result Object Pattern)

Located in `src/config/rop/`:

- `Result<T>` - API response handler for success/failure states
- Methods: `Result.success()`, `Result.failure()`, `Result.simpleError()`, `Result.err()`
- Properties: `value`, `errors`, `statusCode`, `errorCode`, `success`, `allErrors`, `generalErrors`

All API services should return `Result<T>` for consistent error handling.

## Environment Variables

Located in `src/config/env.ts`:

- Uses Zod for validation at startup
- Import `env` from `@/config/env` - do NOT use `import.meta.env` directly
- Required: `VITE_API_BASE_URL`, `VITE_API_URL`, `VITE_REDIRECTION_DOMAIN`
- Optional: `VITE_API_PORT`, `VITE_APP_NAME` (default: "Url Shorten"), `VITE_DEBUG_MODE`

## Shared Constants

Located in `src/shared/constants/`:

- **cookieKey.ts**: `CookieKey` - Centralized cookie keys
- **routePath.ts**: `RoutePath` - Centralized route paths
- **storageKey.ts**: `StorageKey` - Centralized localStorage keys

Always use these constants instead of hardcoding strings.

## Tools

When you need to search docs, use `context7` tools.
