# Use Node 18
FROM node:18

# Set working directory inside container
WORKDIR /app/backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy all backend code
COPY backend/ ./

# Expose port used by backend
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]
