# Stage 1: Build with Node
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies separately to cache better
COPY package*.json ./
RUN npm install

# Fix Rollup issue: clear node_modules and reinstall
RUN rm -rf node_modules package-lock.json && \
    npm install && \
    npm install rollup@3.29.4

# Copy source code
COPY . .

# Step 6: Build the app for production (use for production build)
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 5173

# Step 8: Start the app
CMD ["npm", "run", "dev", "--", "--host"]
