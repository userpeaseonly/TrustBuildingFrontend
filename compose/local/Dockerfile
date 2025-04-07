# Dockerfile for local development
FROM node:16-bullseye

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code (except for what is in .dockerignore)
COPY . .

# Set environment variable
ENV NODE_ENV=development

# Expose the port for the local server
EXPOSE 5173

# Command to run the application in development mode
CMD ["npm", "run", "dev"]
