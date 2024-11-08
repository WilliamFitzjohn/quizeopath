# Use an official Node.js runtime as a parent image
FROM node:16-alpine AS base

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

FROM base as development
WORKDIR /home/node/app
RUN npm install --force
USER node
CMD ["npm", "run", "dev"]

FROM base as production
WORKDIR /home/node/app
COPY --from=development /home/node/app/node_modules /home/node/app/node_modules
RUN npm run build

FROM nginx:stable-alpine as deploy
WORKDIR /home/node/app
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=production /home/node/app/dist /usr/share/nginx/html/