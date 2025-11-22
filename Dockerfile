# Use Node 18
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose server port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
