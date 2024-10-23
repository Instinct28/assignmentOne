# Use Node.js as the base image
FROM node:22.4.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change to 8000)
EXPOSE 8001

# Start the application
CMD ["npm", "start"]