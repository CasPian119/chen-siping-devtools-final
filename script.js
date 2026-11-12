"use strict";

const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute("aria-label", dark ? "切换到浅色主题" : "切换到深色主题");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#191d21" : "#f7f6f2";
}
let savedTheme;
try { savedTheme = localStorage.getItem("siping-theme"); } catch (_) { /* 本地文件或隐私模式可能禁用存储。 */ }
setTheme(savedTheme === "dark" ? "dark" : "light");
themeButton.addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  try { localStorage.setItem("siping-theme", theme); } catch (_) { /* 当次浏览仍可切换。 */ }
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "打开导航菜单");
}
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("click", event => {
  if (!event.target.closest(".header")) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 601px)").addEventListener("change", event => {
  if (event.matches) closeMenu();
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  let count = 0;
  projectCards.forEach(card => {
    card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count += 1;
  });
  document.querySelector("#filter-status").textContent = `已显示 ${count} 个作品`;
}));

const projectDetails = {
  site: {
    title: "从零连接，一个个人网站", category: "WEB / NETWORK", image: "assets/network.svg",
    alt: "本站原创蓝色网络节点示意插画",
    description: "这是《开发工具与工程实践》课程中的个人网站项目，也是将专业学习与个人兴趣连接起来的一次尝试。当前已完成本地页面，下一步是在 Linux 服务器上完成 Nginx 部署。",
    points: ["原生 HTML、CSS 与 JavaScript，无构建工具或外部依赖。", "响应式布局、作品筛选、可访问的详情弹窗和明暗主题。", "通过 Git 记录开发过程，后续演示提交、推送和服务器更新。"],
    note: "当前状态：本地构建中，尚未完成服务器部署。配图为原创示意插画。"
  },
  coast: {
    title: "海岸线与温柔的光", category: "VISUAL / LIGHT", image: "assets/coast.svg",
    alt: "蓝色海面、远山与暖阳组成的原创海岸插画",
    description: "一幅为本站制作的海岸构图示意。用天空、远山和海岸的层次分配画面，尝试在蓝色与暖色之间找到平衡。",
    points: ["观察地平线如何划分空间。", "用简洁的色块控制视觉重心。", "未来可替换为本人实拍，并补充拍摄时间、地点及思考。"],
    note: "内容说明：原创 SVG 视觉示例，非个人实拍照片，不代表已完成的摄影作品。"
  },
  architecture: {
    title: "日常里，寻找几何", category: "VISUAL / GEOMETRY", image: "assets/architecture.svg",
    alt: "米白与陶土红色块构成的原创建筑几何插画",
    description: "一幅以建筑轮廓为主题的构图示意。拱门、台阶与墙面，把日常景象简化为清晰的几何关系。",
    points: ["用线条引导视线，让画面更有秩序。", "留意光照与阴影形成的色块。", "计划在日常摄影中收集相似的构图，再用真实作品更新这个板块。"],
    note: "内容说明：原创 SVG 视觉示例，非个人实拍照片，不代表已完成的摄影作品。"
  }
};
const dialog = document.querySelector("#project-dialog");
let dialogTrigger;
document.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => {
  const item = projectDetails[button.dataset.project];
  if (!item) return;
  dialogTrigger = button;
  document.querySelector("#dialog-title").textContent = item.title;
  document.querySelector("#dialog-category").textContent = item.category;
  document.querySelector("#dialog-description").textContent = item.description;
  document.querySelector("#dialog-note").textContent = item.note;
  const image = document.querySelector("#dialog-image");
  image.src = item.image;
  image.alt = item.alt;
  const list = document.querySelector("#dialog-points");
  list.replaceChildren(...item.points.map(text => {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  }));
  dialog.showModal();
  document.body.style.overflow = "hidden";
  dialog.scrollTop = 0;
  document.querySelector(".dialog-close").focus();
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  if (dialogTrigger) dialogTrigger.focus();
});

let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 4500);
}
document.querySelector("#copy-link").addEventListener("click", async () => {
  if (location.protocol === "file:") {
    showToast("当前为本地文件预览。部署后即可复制可分享的网站地址。");
    return;
  }
  const url = location.href.split("#")[0];
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      copied = true;
    }
  } catch (_) { /* 非 HTTPS / 权限受限时继续尝试兼容方式。 */ }
  if (!copied) {
    const input = document.createElement("textarea");
    input.value = url;
    input.setAttribute("aria-label", "本站地址");
    input.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.append(input);
    input.select();
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    input.remove();
    document.querySelector("#copy-link").focus();
  }
  showToast(copied ? "本站地址已复制。" : "未能复制，请从浏览器地址栏手动复制本站地址。");
});
document.querySelector("#year").textContent = String(new Date().getFullYear());
