FROM node:10-alpine as dependencies
WORKDIR /opt/nodedora
ENV NODE_ENV=production
RUN apk --no-cache add cmake ffmpeg-dev g++ make ninja python sdl2-dev
COPY package*.json ./
RUN npm install

FROM dependencies as devDependencies
WORKDIR /opt/nodedora
ENV NODE_ENV=development
RUN npm install

FROM node:10-alpine as build
WORKDIR /opt/nodedora
COPY --from=devDependencies /opt/nodedora/node_modules ./node_modules
COPY . ./
RUN npm run build

FROM node:10-alpine as test
WORKDIR /opt/nodedora
COPY --from=devDependencies /opt/nodedora/node_modules ./node_modules
COPY . ./
ARG ENV_FILE
RUN export ${ENV_FILE?} && npm run test
RUN npm run lint

FROM node:10-alpine as run
WORKDIR /opt/nodedora
RUN apk add --no-cache ffmpeg pulseaudio pulseaudio-alsa sdl2
COPY --from=dependencies /opt/nodedora/node_modules ./node_modules
COPY --from=build /opt/nodedora/dist ./dist
USER node
ENTRYPOINT ["node", "dist/server.js"]
