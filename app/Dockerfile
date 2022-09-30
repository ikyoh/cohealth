FROM node:18-alpine

ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL

ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm i --force

COPY . /app

CMD ["npm", "run", "start"]
EXPOSE 3000



