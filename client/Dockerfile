# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else (for production build, you’d do this in build stage)
COPY . .

# Expose React default port
EXPOSE 3000

# Start React in development mode (with hot reload)
CMD ["npm", "start"]

