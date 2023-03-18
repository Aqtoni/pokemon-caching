FROM node:16.18.0 AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN yarn

FROM node:16.18.0
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn", "run", "start:dev"]