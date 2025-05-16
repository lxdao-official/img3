# Use a Node.js base image (avoiding Alpine Linux due to compatibility issues)
FROM node:18

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

# Copy all source files
COPY . .

# Install dependencies
RUN pnpm install

# Build the core packages individually (skip using turbo due to compatibility issues)
# First build uploader3-connector (no dependencies)
RUN cd packages/uploader3-connector && npm run build

# Then build uploader3 (depends on uploader3-connector)
RUN cd packages/uploader3 && npm run build

# Finally build img3
RUN cd packages/img3 && npm run build

# Expose port 3001 for the docs application
EXPOSE 3001

# Set working directory to /app/apps/docs
WORKDIR /app/apps/docs

# 解决 @napi-rs/simple-git-linux-arm64-gnu 模块缺失问题
# 安装 corepack 并启用
RUN npm install -g corepack && corepack enable

# 禁用 Nextra 使用 simple-git 功能，通过设置环境变量来绕过架构相关问题
ENV NEXT_SKIP_GIT_CHECK=true
ENV NEXT_TELEMETRY_DISABLED=1

# 构建文档应用
RUN npm run build

# 以生产模式启动文档应用
CMD ["npm", "run", "start"]
