# Use Node 18
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json (from root)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files (backend + frontend)
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "backend/server.js"]
