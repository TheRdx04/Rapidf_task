# Use an official Node.js runtime as the base image
FROM node:23-alpine3.19

# Set the working directory inside the container
WORKDIR /usr/src/app
RUN mkdir uploads
RUN mkdir files
# Install system dependencies (qpdf and libreoffice)
RUN apk add --no-cache \
    qpdf \
    libreoffice \
    bash

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production


COPY . .


EXPOSE 5000


CMD ["node", "index.js"]
