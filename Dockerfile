# Use the official Node.js image as a base
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

ENV MODEL_URL=https://storage.googleapis.com/model-submission-septio/model-in-prod/model.json

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .
COPY creds.json /usr/src/app/creds.json

# Set the environment variable to authenticate with Google Cloud
ENV GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/creds.json

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
