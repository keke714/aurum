#!/usr/bin/env bash
# ════════════════════════════════════════════════
#  Aurum 一键部署脚本
#  运行：bash deploy.sh
#  需要：已安装 git + gh (GitHub CLI)
# ════════════════════════════════════════════════
set -e

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  ✦ Aurum v1.0 — 一键部署到 GitHub Pages  ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# 1. 检查 gh 是否已登录
if ! gh auth status 2>/dev/null; then
  echo "👉 需要先登录 GitHub..."
  gh auth login --hostname github.com --git-protocol https
fi

# 2. 问仓库名
read -rp "📦  你的 GitHub 用户名是？ " GH_USER
read -rp "📂  仓库名（回车用 aurum）：" GH_REPO
GH_REPO="${GH_REPO:-aurum}"

# 3. 用 gh 创建仓库（如果不存在）
if gh repo view "$GH_USER/$GH_REPO" 2>/dev/null; then
  echo "✅ 仓库已存在：$GH_USER/$GH_REPO"
else
  echo "🆕 创建新仓库：$GH_USER/$GH_REPO"
  gh repo create "$GH_USER/$GH_REPO" --public --source=. --push --remote=origin || {
    echo "⚠️  直接创建失败，改用手动 push..."
    git remote add origin "https://github.com/$GH_USER/$GH_REPO.git" 2>/dev/null || \
      git remote set-url origin "https://github.com/$GH_USER/$GH_REPO.git"
    git push -u origin main
  }
fi

# 4. 开启 Pages（用我们的 workflow 自动部署）
echo "🔧  配置 GitHub Pages..."
gh api --method PUT "/repos/$GH_USER/$GH_REPO/pages" \
  -f "build_type=workflow" 2>/dev/null && echo "  ✅ Pages → Workflow 部署已开启" || \
  echo "  ⚠️  自动开启失败，请手动到 Settings → Pages → Source: GitHub Actions"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  🚀 部署完成！                          ║"
echo "║                                          ║"
echo "║  你的 GitHub Pages:                     ║"
echo "║  https://$GH_USER.github.io/$GH_REPO/    ║"
echo "║                                          ║"
echo "║  等 1-3 分钟让 Action 跑完...            ║"
echo "║  手机打开 → 菜单 → 添加到主屏幕 ✦       ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "🔗 GitHub 仓库: https://github.com/$GH_USER/$GH_REPO"
