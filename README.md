# 邮件等待列表

一个美观、科技感十足的邮件等待列表网站，使用Next.js和PostgreSQL构建。

## 功能特点

- 响应式设计，适配各种设备
- 动画背景效果，提升用户体验
- 邮箱验证和错误处理
- 实时显示等待列表人数
- 使用Zeabur PostgreSQL数据库存储用户邮箱

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [Framer Motion](https://www.framer.com/motion/) - 动画效果
- [React Hot Toast](https://react-hot-toast.com/) - 通知提示
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) - 数据库客户端

## 开始使用

### 前提条件

- Node.js 18.x 或更高版本
- Zeabur PostgreSQL数据库

### 安装

1. 克隆仓库

```bash
git clone https://github.com/yourusername/mail-waitlist.git
cd mail-waitlist
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

创建一个`.env.local`文件，并添加以下内容（替换为你的Zeabur PostgreSQL数据库信息）：

```
POSTGRES_URL="postgres://username:password@host:port/database"
POSTGRES_USER="your_username"
POSTGRES_PASSWORD="your_password"
POSTGRES_HOST="your_host"
POSTGRES_DATABASE="your_database"
```

4. 运行开发服务器

```bash
npm run dev
```

5. 打开 [http://localhost:3000](http://localhost:3000) 查看网站

## 部署

该项目可以轻松部署到Vercel或其他支持Next.js的平台。

### 部署到Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fmail-waitlist)

确保在Vercel项目设置中添加环境变量。

## 许可证

MIT
