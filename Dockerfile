# Base image
FROM node:20

RUN useradd -ms /bin/sh -u 1001 app

USER app

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=app:app package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=app:app . .

# Copy the .env and .env.development files
# COPY .env .env.development ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]