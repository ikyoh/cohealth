FROM node:18-alpine as app_common

ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL


WORKDIR /app
COPY ./package.json ./
RUN npm i --force

COPY . /app

EXPOSE 3000

FROM app_common AS app_dev

ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API

CMD ["npm", "run", "start"]


FROM app_common AS app_prod

ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API

ENV NODE_ENV production

RUN npm run build --force





