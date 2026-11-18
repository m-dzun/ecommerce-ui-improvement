
// Dán URL GitHub Repository và GitHub Pages của bạn vào đây.
const GITHUB_REPOSITORY_URL = "https://github.com/m-dzun/ecommerce-ui-improvement";
const GITHUB_PAGES_URL = "https://m-dzun.github.io/ecommerce-ui-improvement/FE_NangCao";

// Danh sách các liên kết trên trang web
const links = [
  {
    id: "repoLink",
    url: GITHUB_REPOSITORY_URL
  },
  {
    id: "pageLink",
    url: GITHUB_PAGES_URL
  }
];

// Cập nhật đường dẫn cho từng liên kết
links.forEach(({ id, url }) => {
  const link = document.getElementById(id);

  if (url.trim()) {
    // Nếu đã có URL thì cho phép mở liên kết
    link.href = url;
    link.classList.add("is-ready");
  } else {
    // Nếu chưa có URL thì hiển thị thông báo
    link.href = "#";

    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Bạn hãy thêm đường dẫn GitHub vào file script.js nhé!");
    });
  }
});
