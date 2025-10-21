# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# The app binds to port 3002
EXPOSE 3002

# Command to run the application
CMD [ "npm", "start" ]
