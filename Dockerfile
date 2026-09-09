# Use official Node.js 22 image as the base
FROM node:22-alpine AS build
# Same-origin path by default: the built bundle calls "/api" on its own
# origin, and nginx (below) proxies that to the real backend server-side.

ARG APP_NAME="URL Shortener"
ARG APP_VERSION="1.0.0"
ARG API_BASE_URL="/api"
ARG REDIRECTION_DOMAIN

ENV VITE_APP_NAME=$APP_NAME
ENV VITE_APP_VERSION=$APP_VERSION
ENV VITE_API_BASE_URL=$API_BASE_URL
ENV VITE_REDIRECTION_DOMAIN=$REDIRECTION_DOMAIN

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and install dependencies
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Astro project
RUN pnpm run build

# Production stage: use a lightweight web server for the final image
FROM nginx:alpine

# Real backend address, resolved server-side only — never shipped to the
# browser. Override at container runtime, e.g.:
#   docker run -e BACKEND_ORIGIN=https://internal-api.example.com ...
ENV BACKEND_ORIGIN=http://localhost:5149

# Copy only the built files and necessary assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Expose the port the app runs on
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]