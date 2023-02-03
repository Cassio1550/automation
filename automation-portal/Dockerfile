FROM 11paths/ngcli:11.2.2 AS build-env
WORKDIR /app

# Copy .json and restore as distinct layers
COPY *.json ./
RUN npm install

# Copy everything else and build
COPY . ./
RUN ng build --prod

# Build runtime image
FROM nginx:stable
WORKDIR /app
COPY --from=build-env /app/dist/ .
COPY ./.conf/nginx-custom.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
