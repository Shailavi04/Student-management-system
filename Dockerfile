# Use Node 18
FROM node:18

# Set working directory
WORKDIR /app/backend

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "backend/server.js"]
