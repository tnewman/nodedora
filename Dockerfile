FROM node:lts-alpine as dependencies
ENV NODE_ENV=production
WORKDIR /opt/nodedora
COPY package*.json ./
RUN npm install

FROM dependencies as build
ENV NODE_ENV=development
RUN npm install
COPY . ./
RUN npm run build

FROM build as test
ARG ENV_FILE
RUN env $(echo $ENV_FILE | tr "\\n" " ") npm run test
RUN env $(echo $ENV_FILE | tr "\\n" " ") npm run lint

FROM dependencies as production
COPY --from=build /opt/nodedora/dist ./dist
USER node
ENTRYPOINT ["node", "dist/server.js"]
