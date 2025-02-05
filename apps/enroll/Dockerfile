# STAGE 1: Build the application
FROM docker.arvancloud.ir/node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY --chown=node:node package*.json ./
COPY --chown=node:node .env ./

# Copy Prisma files
COPY --chown=node:node libs/prisma/prisma/schema.prisma ./prisma/

# Copy source code
COPY --chown=node:node . .

# Generate Prisma client, build app and install production deps in single layer
RUN npx prisma generate --schema=./libs/prisma/prisma/schema.prisma && \
    npm run build enroll && \
    npm install --omit=dev && npm cache clean --force

USER node

# STAGE 2: Production stage
FROM docker.arvancloud.ir/node:20-alpine AS production

WORKDIR /app

# Copy built files and dependencies
COPY --chown=node:node --from=build /usr/src/app/dist/apps/enroll ./dist/apps/enroll
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/.env ./
COPY --chown=node:node --from=build /usr/src/app/libs/proto ./libs/proto

USER node

# Set NODE_ENV
ENV NODE_ENV=production

# Expose the port
EXPOSE 3002


CMD ["sh", "-c", "npx prisma db push && node dist/apps/enroll/main.js"]