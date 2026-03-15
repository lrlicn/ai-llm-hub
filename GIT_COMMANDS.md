# Git 常用操作命令速查

## 1. 首次提交（项目初始化）

```bash
# 初始化 Git 仓库（如果还没初始化）
git init

# 添加所有文件到暂存区
git add .

# 提交到本地仓库
git commit -m "feat: 初始化项目 - AI 大模型资源中心 v1.0.0

- 实现模型导航、对比、场景推荐、知识库四大核心模块
- 包含 6 个模型、6 个场景、3 篇文档的示例数据
- 基于 Vue 3 + TypeScript + Vite 技术栈"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/lrlicn/ai-llm-hub.git

# 推送到远程仓库
git push -u origin main
```

---

## 2. 日常开发提交

```bash
# 查看当前修改状态
git status

# 查看具体修改内容
git diff

# 添加指定文件
git add src/pages/Home/Home.vue

# 添加所有修改的文件
git add .

# 提交（简洁版）
git commit -m "feat: 添加新功能描述"

# 提交（详细版）
git commit -m "feat: 添加模型对比功能

- 实现多模型并排对比
- 添加能力评分可视化
- 支持弹窗选择模型"

# 推送到远程
git push
```

---

## 3. 提交信息规范（建议遵循）

| 类型 | 说明 | 示例 |
|-----|------|------|
| `feat:` | 新功能 | `feat: 添加模型搜索功能` |
| `fix:` | 修复bug | `fix: 修复对比页面样式问题` |
| `docs:` | 文档更新 | `docs: 更新README说明` |
| `style:` | 代码格式 | `style: 调整按钮样式` |
| `refactor:` | 重构 | `refactor: 优化模型列表组件` |
| `chore:` | 构建/工具 | `chore: 添加WebStorm配置` |

---

## 4. 查看历史与回退

```bash
# 查看提交历史
git log

# 查看简洁历史（一行显示）
git log --oneline

# 查看最近5条
git log -5 --oneline

# 回退到上一个版本（保留修改）
git reset --soft HEAD~1

# 回退到上一个版本（丢弃修改，慎用！）
git reset --hard HEAD~1
```

---

## 5. 分支操作

```bash
# 查看当前分支
git branch

# 创建新分支
git branch feature/new-page

# 切换到新分支
git checkout feature/new-page

# 创建并切换（简写）
git checkout -b feature/new-page

# 合并分支到当前分支
git merge feature/new-page

# 删除分支
git branch -d feature/new-page
```

---

## 6. 拉取更新

```bash
# 拉取远程最新代码
git pull

# 完整版（先获取再合并）
git fetch origin
git merge origin/main
```

---

## 7. 撤销操作

```bash
# 撤销工作区的修改（未 add）
git checkout -- filename

# 撤销暂存区的修改（已 add 未 commit）
git reset HEAD filename

# 修改最后一次提交
git commit --amend -m "新的提交信息"
```

---

## 8. 常用组合命令（推荐收藏）

```bash
# 快速提交当前修改
git add . && git commit -m "update: 日常更新" && git push

# 查看当前状态+日志
git status && git log -3 --oneline
```
