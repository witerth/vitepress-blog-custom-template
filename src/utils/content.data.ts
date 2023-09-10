import { Page } from "@/types";
import dayjs from "dayjs";
import { createContentLoader } from "vitepress";

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
  const category = url.replace(/\/content\/posts\/(.*)\/.*\.html/, "$1");
  return category.includes("post") ? "未分类" : category;
};
export default createContentLoader("./content/**/*.md", {
  includeSrc: true,
  render: true,
  transform(raw): Page[] {
    return raw
      .map(({ url, frontmatter, html, src }) => {
        src = parseSrc(src);
        const date = dayjs(frontmatter.date).toDate().getTime();
        const update = frontmatter.update
          ? dayjs(frontmatter.update).toDate().getTime()
          : date;
        return {
          title: frontmatter.title,
          url,
          frontmatter,
          src: src,
          desc: parseDesc(html, frontmatter.summary),
          date: date,
          update: update,
          html: html,
          category: getPageCategory(url),
        };
      })
      .sort((a, b) => b.update - a.update);
  },
});
