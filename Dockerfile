# Stage 1 - Build stage
FROM node:24-alpine as stage1
LABEL name="client"
EXPOSE 80

# Set working directory and install dependencies
WORKDIR /app
COPY package.json . 

RUN npm install && npm install vite && npm cache clean -f

# Copy the rest of the project files and run build
COPY . .
RUN npm run build

# Stage 2 - Serve the built application
FROM node:24-alpine as stage2
WORKDIR /app

# Install serve globally for serving the app
RUN npm install -g serve

# Copy the build output from stage1
COPY --from=stage1 /app/dist .

# Use serve to host the app on port 80
ENTRYPOINT ["serve", "-s", "-n", "-d", ".", "-p", "80"]