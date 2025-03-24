FROM node:22.13.1-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

EXPOSE 3333

CMD ["pnpm", "dev"]




