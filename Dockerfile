FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3000

# Run the development server
CMD ["npm", "start"] 