import { Page } from "@/types";
import dayjs from "dayjs";
import { createContentLoader, scaffold } from "vitepress";

function parseDesc(src: string | undefined, desc: string): string {
  if (desc && desc !== "") {
    return desc;
  }

  if (src) {
    return src;
  }

  return "";
}

// skip --- ---
function parseSrc(src: string | undefined): string {
  if (!src) {
    return "";
  }

  const pairs = src.split("---");
  if (pairs.length < 2) {
    return "";
  }

  return pairs.slice(2).join("---");
}

const getPageCategory = (url: string) => {
  // 用正则去除/content/posts/ 后面去掉/xxx.html
  const cleanUrl = url.replace(/\/content\/(.*)\/.*\.html/, "$1");

  const category = cleanUrl.includes("content") ? "未分类" : cleanUrl;
  const categoryAry = category.split("/");

  return {
    category,
    categoryAry,
  };
};

export default createContentLoader("./content/**/*.md", {
  includeSrc: true,
  render: true,
  transform(raw): Page[] {
    return raw
      .map(({ url, frontmatter, html, src }) => {
        src = parseSrc(src);
        const date = dayjs(frontmatter.date).toDate().getTime();
        const { category, categoryAry } = getPageCategory(url);
        const update = frontmatter.update
          ? dayjs(frontmatter.update).toDate().getTime()
          : date;
        return {
          title: frontmatter.title,
          frontmatter,
          src: src,
          desc: parseDesc(html, frontmatter.summary),
          date: date,
          html: html,
          url,
          update: update,
          category,
          categoryAry,
        };
      })
      .sort((a, b) => b.update - a.update);
  },
});
