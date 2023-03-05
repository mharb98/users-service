FROM node:14-alpine as development

WORKDIR /app

COPY package.json .

# We use apk instead of apt-get because this image is alpine based
RUN apk update && apk add openssl

RUN npm install
RUN npm install @prisma/client

COPY prisma ./prisma/

RUN npx prisma generate 

COPY . .

EXPOSE 3001
EXPOSE 5555

CMD ["npm", "run", "start:dev"]

FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine as production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]