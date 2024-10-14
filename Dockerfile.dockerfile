# Use Node.js base image
FROM node:16

# Set working directory in container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 49160

# Start the application
CMD ["node", "server.js"]
