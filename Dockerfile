### STAGE 1: Build ###
FROM node:13.3.0 AS ui-build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ui-build /usr/src/app/dist/user-registration /usr/share/nginx/html
