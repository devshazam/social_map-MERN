FROM node:18.15.0

# Create app directory
WORKDIR /app

RUN apt-get update && apt-get install -y vim

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm i -g nodemon

# Copy source directory
COPY . .

CMD [ "npm", "run", "dev" ]
