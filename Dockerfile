FROM node:14-alpine as builder

RUN apk add --no-cache libc6-compat

ARG STAGE=dev
ARG BASE_PATH=/
ARG CI_JOB_TOKEN
ARG GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="–max_old_space_size=2048"

WORKDIR /app

COPY ./ ./

RUN yarn install
RUN yarn run build 

FROM node:14-alpine as dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY ./ ./

RUN yarn install --production 

FROM node:14-alpine as runner

ARG STAGE=dev
ARG BASE_PATH=/
ARG CI_JOB_TOKEN
ARG NEXT_TELEMETRY_DISABLED 1
ARG PORT=4000

WORKDIR /app

# copy source files
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

ENV NODE_ENV=production

WORKDIR /app

# start app
EXPOSE $PORT
CMD yarn run start
