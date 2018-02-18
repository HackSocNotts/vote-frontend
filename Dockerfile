FROM nginx:1-alpine

WORKDIR /usr/share/nginx/html

COPY ./dist /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
