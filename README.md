# AI 大模型资源中心

**一站式大模型信息导航与对比平台**

[在线演示](#) · [功能特性](#功能特性) · [快速开始](#快速开始)

---

## 📖 项目简介

AI 大模型资源中心是一个帮助开发者、产品经理和技术决策者快速了解、对比
和选择大语言模型的信息平台。提供模型信息展示、能力评分对比、场景推荐和
知识库等功能。

## ✨ 功能特性

### 🔍 模型导航
- 收录国内外主流大模型（GPT-4.1、Claude 4、DeepSeek、文心一言等）
- 支持按来源、类型、开源状态、部署方式筛选
- 详细的能力评分可视化展示

### ⚖️ 模型对比
- 支持 2-4 个模型并排对比
- 多维度对比：基本信息、能力评分、价格、优劣势
- 可视化能力评分条

### 🎯 场景推荐
- 覆盖代码助手、知识问答、内容创作等常见场景
- 每个场景提供关键考量和推荐模型
- 帮助快速找到适合的模型

### 📚 知识库
- 大模型选型指南和最佳实践
- 三栏布局，支持目录导航
- 阅读进度自动追踪

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)

### 安装运行

```bash
# 克隆项目
git clone https://github.com/lrlicn/ai-llm-hub.git

# 进入目录
cd ai-llm-hub

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 🛠️ 技术栈

| 技术 | 说明 |
|-----|------|
| Vue 3 | 渐进式 JavaScript 框架 |
| TypeScript | 类型安全 |
| Vite | 下一代前端构建工具 |
| Pinia | Vue 状态管理 |
| Vue Router | 路由管理 |
| markdown-it | Markdown 解析器 |

## 📁 项目结构
ai-llm-hub/
├── src/
│   ├── components/      # 公共组件
│   ├── pages/           # 页面组件
│   ├── services/        # 数据服务
│   ├── store/           # 状态管理
│   ├── types/           # 类型定义
│   ├── data/            # 静态数据
│   └── docs/            # 文档资源
├── public/              # 静态资源
└── package.json

## 📝 数据说明

项目当前使用本地 JSON 数据，位于 `src/data/` 目录：

- `models.json` - 模型信息数据
- `scenarios.json` - 场景推荐数据
- `src/docs/` - 知识库 Markdown 文档

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 👤 作者

**lrlicn**
- GitHub: [@lrlicn](https://github.com/lrlicn)

---
如果这个项目对你有帮助，请给一个 ⭐️ Star 支持一下！

## WebStorm 用户注意

如果使用 WebStorm 打开项目，建议：
1. 打开项目后，等待索引完成
2. 点击 `File` → `Invalidate Caches / Restart` 刷新缓存
3. 确保 Node.js 解释器已正确配置（Settings → Languages & Frameworks → Node.js）