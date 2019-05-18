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
RUN npm run test
RUN npm run lint

FROM dependencies as production
COPY --from=build /opt/nodedora/dist ./dist
USER node
ENTRYPOINT ["node", "dist/src/server.js"]
