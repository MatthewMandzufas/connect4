FROM node:21.6.1 as builder 
RUN npm install -g pnpm
USER node 
WORKDIR /app 
COPY --chown=node:node package.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node tsconfig.node.json .
COPY --chown=node:node vite.config.ts .
COPY --chown=node:node src/* .
RUN pnpm i 
# RUN pnpm run dev


