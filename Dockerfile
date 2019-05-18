FROM node:12-alpine as dependencies
WORKDIR /opt/nodedora
ENV NODE_ENV=production
RUN apk update && apk add cmake ffmpeg ninja && rm -rf /var/cache/apk/*
COPY package*.json ./
RUN npm install

FROM dependencies as devDependencies
WORKDIR /opt/nodedora
ENV NODE_ENV=development
RUN npm install

FROM node:12-alpine as build
WORKDIR /opt/nodedora
COPY --from=devDependencies /opt/nodedora/node_modules ./node_modules
COPY . ./
RUN npm run build

FROM node:12-alpine as test
WORKDIR /opt/nodedora
RUN apk update && apk add ffmpeg && rm -rf /var/cache/apk/*
COPY --from=devDependencies /opt/nodedora/node_modules ./node_modules
COPY . ./
ARG ENV_FILE
RUN export ${ENV_FILE?} && npm run test
RUN npm run lint

FROM node:12-alpine as run
WORKDIR /opt/nodedora
RUN apk update && apk add ffmpeg && rm -rf /var/cache/apk/*
COPY --from=dependencies /opt/nodedora/node_modules ./node_modules
COPY --from=build /opt/nodedora/dist ./dist
USER node
ENTRYPOINT ["node", "dist/server.js"]
