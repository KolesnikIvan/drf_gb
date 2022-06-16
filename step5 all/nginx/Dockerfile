FROM nginx:1.19.6-alpine

# replace dfault nginx config file
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
