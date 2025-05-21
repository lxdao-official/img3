# 使用 Node.js 官方镜像作为基础镜像
FROM node:18-alpine

# 安装构建依赖
RUN apk add --no-cache python3 make g++ py3-pip py3-setuptools libc6-compat

# 设置工作目录
WORKDIR /app

# 复制所有文件
COPY . .

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@8.6.12 --activate

# 清理并重新安装依赖
RUN rm -rf node_modules
RUN pnpm install

# 构建应用
RUN npx turbo run build

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["pnpm", "start"]