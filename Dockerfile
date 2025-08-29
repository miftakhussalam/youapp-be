# Gunakan Node.js LTS sebagai base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & yarn.lock
COPY package.json yarn.lock ./

# Install dependencies dengan Yarn
RUN yarn install --frozen-lockfile

# Copy seluruh source code
COPY . .

# Build aplikasi NestJS
RUN yarn build

# Expose port NestJS
EXPOSE 4000

# Start aplikasi dengan Yarn
CMD ["yarn", "start:prod"]
