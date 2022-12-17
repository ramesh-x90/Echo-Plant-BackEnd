FROM node:alpine
RUN apk add libssl1.1
RUN npm install -g pkg
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
RUN chmod 777 ./script.sh
CMD ["./script.sh"]