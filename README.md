# Konoha Blog

基于 Astro 构建的个人博客与作品集，使用 Decap CMS 在本地管理文章，通过 GitHub Actions 自动部署到 GitHub Pages。

[访问网站](https://xkonohax.github.io/)

## 功能

- 响应式首页、作品集、博客及关于页面。
- 明暗主题切换，默认跟随系统并记住手动选择。
- 作品分类筛选、图片预览和视频播放。
- Markdown / MDX 文章、标签筛选、RSS 和站点地图。
- Decap 本地管理 Markdown 文章及封面，支持草稿；支持作品图片/视频上传、排序和隐藏。
- 静态构建，生产网站不包含管理后台。

## 本地运行

需要 Node.js 22.12 或更高版本，部署工作流使用 Node.js 24。

```sh
npm install
npm run dev -- --background
```

打开 [本地预览](http://localhost:4321/)。如需管理文章，另开终端运行：

```sh
npm run cms
```

保持该终端运行，并打开 [管理后台](http://localhost:4321/admin/)。保存只修改本地文件；文章取消草稿并提交、推送后才会发布。MDX 文章通过代码编辑器维护。

```sh
npm run astro -- dev stop  # 停止开发服务器
npm run build             # 生成 dist/ 静态网站
npm run preview           # 预览构建结果
```

## 项目结构

```text
src/pages/          页面与路由
src/components/     公共组件
src/layouts/        页面布局
src/content/blog/   Markdown / MDX 文章
src/data/           作品数据
src/config/theme.css 配色、字体与外观配置
src/styles/         样式
public/uploads/     上传的图片与视频
cms/                本地内容管理配置
```

个人信息在 `src/consts.ts` 中配置，作品数据位于 `src/data/works.json`。

## 外观配置

统一在 `src/config/theme.css` 中修改主题色、字体、字号、行高、圆角和页面宽度。`:root` 定义默认外观与浅色配色，`:root[data-theme='dark']` 定义深色配色。开发服务器运行时保存即可预览，发布前重新构建。

## 部署

目标仓库为 `xkonohax/xkonohax.github.io`。在仓库的 **Settings → Pages → Source** 中选择 **GitHub Actions**，推送到 `main` 后由部署工作流自动构建并发布。

草稿不生成公开文章页面，但公开仓库中的源文件仍可被访问。
