# Step 1: Build the app
FROM node:18.16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Run the app
FROM nginx:stable-alpine as production

RUN mkdir /app
COPY --from=build /app/dist /data/www

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]