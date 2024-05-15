FROM node:18-alpine AS base
RUN npm i -g pnpm

EXPOSE 3000 50051

# development stage
FROM base AS development 
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./ 
RUN npm install
COPY . . 
RUN npm run build ${APP} 

# production stage
FROM base AS production 
ARG APP 
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./ 
RUN npm install --prod
COPY --from=development /usr/src/app/dist ./dist 
 
# Add an env to save ARG
ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}