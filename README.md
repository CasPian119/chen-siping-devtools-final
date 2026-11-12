# 陈思坪的个人网站 · 观察生活，连接世界

《开发工具与工程实践》期末作品。计算机网络与技术专业个人主页，结合技术学习、摄影与音乐兴趣。由 AI 辅助规划与开发，个人内容由本人核对。

## 运行

解压后直接双击 `index.html` 即可浏览，无需安装依赖。也可以在当前目录运行 `python -m http.server 8080`，打开 `http://localhost:8080`。本地预览不等于完成 Linux 部署。

## 技术栈

HTML5、CSS3、原生 JavaScript、原创 SVG 插画，无框架、无外部字体与 CDN。支持移动端、键盘操作和减少动态效果设置。

## 目录结构

```text
index.html             页面与内容
styles.css             响应式样式与主题
script.js              筛选、详情、导航、主题与复制
assets/                原创示意插画
deploy/nginx.conf      Nginx 配置示例
README.md              项目说明
```

## 功能与内容

自我介绍、作品分类筛选与详情、学习笔记、兴趣展示、GitHub 联系入口、复制页面地址、明暗主题、移动端导航。作品中的插画和练习明确标注为示例，不代表本人已经完成的摄影或网络工程项目。替换真实作品时同时更新图片、替代文本及描述。

## 修改内容

修改 `index.html` 中的个人介绍、作品和学习笔记；详情文字在 `script.js` 的 `projectDetails` 中。图片放在 `assets/` 并使用相对路径。GitHub 账号已确认为 `CasPian119`，主页链接已配置；项目远程仓库尚未创建或推送。请勿在公开仓库提交密码、私钥或服务器凭据。

## Linux 部署

使用自行管理的 Linux 服务器和 Nginx。推荐 Ubuntu/Debian，命令执行及截图记录见作业材料中的 `03-部署步骤记录.md`。本项目尚未在服务器部署，以下为计划流程：

1. 通过 SSH 登录服务器，安装并启动 Nginx、Git。
2. 将公开仓库克隆到 `/var/www/personal-site`。
3. 将 `deploy/nginx.conf` 中的 `SERVER_IP_OR_DOMAIN` 换成实际 IP 或域名，配置 Nginx 站点。
4. 执行 `sudo nginx -t`，通过后重载 Nginx。
5. 在云安全组及主机防火墙中确认 HTTP 80 端口可访问；浏览器访问实际服务器地址。
6. 本地修改并 `git add`、`git commit`、`git push`；服务器进入站点目录运行 `git pull --ff-only`；刷新浏览器验证。

不使用 Pages、Vercel、Netlify 或一键建站面板代替课程要求的 Linux 部署。

配置中 `root` 与静态资源规则参考 [Nginx 官方入门文档](https://nginx.org/en/docs/beginners_guide.html)，站点匹配规则参考 [Nginx location 文档](https://nginx.org/en/docs/http/ngx_http_core_module.html#location)。实际安装路径和服务管理命令须按服务器发行版核对。

## 已完成验证

2026-11-12：JavaScript 语法检查通过；本地 HTTP 预览资源正常，未观察到浏览器警告或错误。桌面和手机断点验证了技术/影像筛选（1/2项）、详情打开与关闭、Escape 关闭、主题切换、笔记展开、移动端菜单及复制地址反馈。手机断点未检测到横向溢出或损坏图片。源码使用本地相对路径，无远程运行依赖。尚未完成实际 Linux/Nginx 环境验收。

## 提交要求

公开 GitHub/Gitee 仓库，至少 5 次真实提交。源码压缩包包含本说明及全部页面资源，不包含 `.git`、`node_modules`。演示视频、服务器截图与真实更新记录需完成部署后录制。`06-README.md` 必须与本文件保持一致。

## 素材说明

站内 SVG 为本项目原创矢量示意插画，不是陈思坪的实拍照片。没有使用第三方照片、音乐或远程资源。
