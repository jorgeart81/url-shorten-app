# Use official Node.js 22 image as the base
FROM node:22-alpine AS build

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

# Copy only the built files and necessary assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]