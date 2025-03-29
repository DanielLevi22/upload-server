FROM node:22.13.1 AS base

RUN npm install -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM dependencies AS build

WORKDIR /usr/src/app

COPY . .

COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM cgr.dev/chainguard/node AS production
USER 1000
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json


EXPOSE 3333

CMD ["dist/infra/http/server.mjs"]




