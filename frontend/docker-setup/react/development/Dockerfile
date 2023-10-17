FROM node:16-slim

# Create app directory
WORKDIR /frontend

# Install app dependencies
COPY package*.json ./

COPY . .

RUN npm install


CMD [ "npm", "start" ]
