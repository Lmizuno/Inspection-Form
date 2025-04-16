FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3000

# Run the development server
CMD ["npm", "start"] 