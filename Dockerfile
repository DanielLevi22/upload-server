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

FROM node:22.13.1-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json




# ENV CLOUDFLARE_ACCOUNT_ID="#"
# ENV CLOUDFLARE_ACCESS_KEY_ID="#"
# ENV CLOUDFLARE_SECRET_ACCESS_KEY="#"
# ENV CLOUDFLARE_BUCKET="#"
# ENV CLOUDFLARE_PUBLIC_URL="https://pub-cb9dffa198e24959ac3860070e24c9d5.r2.dev"

EXPOSE 3333

CMD ["node", "dist/infra/http/server.js"]




