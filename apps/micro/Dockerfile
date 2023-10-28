FROM node:alpine AS develop

WORKDIR /Users/hoangpc/Documents/Projects/microservice/micro

RUN npm install 

COPY . . 
RUN npm run build

CMD ["node", "dist/apps/micro/main"]