FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

# Production stage
FROM alpine:3.14

# Install serve to serve the static files
RUN apk add --no-cache nodejs npm && \
    npm install -g serve

WORKDIR /app

# Copy build files from build stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"] 