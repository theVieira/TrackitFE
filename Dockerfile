FROM node:22.16.0 as builder

WORKDIR /app

COPY . . 

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
