# BUILD
FROM node:21-alpine3.18 AS build
WORKDIR /app
COPY ./ShopUser/package*.json ./
RUN npm install
COPY ./ShopUser ./
RUN npm run build:prod

# RUN
FROM nginx:alpine
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/head-shopping-mall-user-web /usr/share/nginx/html
