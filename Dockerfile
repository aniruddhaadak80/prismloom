FROM node:22-alpine
WORKDIR /app
COPY package.json bun.lockb* ./
RUN corepack enable && bun install --frozen-lockfile
COPY . .
RUN bun run build
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["bun", "run", "start"]
