# Use an official Node.js runtime as the base image
FROM node:23-alpine3.19

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install system dependencies (qpdf and libreoffice)
RUN apt-get update && apt-get install -y \
    qpdf \
    libreoffice\
    libreoffice-convert\

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Run the app
CMD ["node", "index.js"]
