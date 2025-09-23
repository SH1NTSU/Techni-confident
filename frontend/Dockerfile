# frontend/Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

# Install global dependencies
RUN npm install -g typescript

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve the build using a lightweight server
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
