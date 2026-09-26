FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8000

FROM node:22-alpine AS development

WORKDIR /app
COPY --from=0 /app /app
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS production

WORKDIR /app
COPY --from=0 /app /app
RUN npm prune --omit=dev
CMD ["npm", "start"]