import { getRssFeed } from "./theme/rss";
import { defineConfigWithTheme, PageData } from "vitepress";
import { ThemeConfig } from "../src/types";

const links: { url: string; lastmod: PageData["lastUpdated"] }[] = [];

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: "renkin的博客",
  description: "What your say ?",
  lang: "zh-CN",
  themeConfig: {
    sortBy: "date",
    dateFormat: "YYYY-MM-DD",
    editLink: {
      text: "✍",
      pattern: ({ relativePath }: { relativePath: string }) => {
        return `https://github.com/rennzhang/blog/blob/main/${relativePath}`;
      },
    },
    issues: {
      showComment: true,
    },
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "主页",
        link: "/",
      },
      {
        text: "Notes",
        link: "/tags?layout=issue",
      },
      {
        text: "Docs",
        link: "/tags?layout=doc",
      },
      { text: "#标签", link: "/tags?layout=post", activeMatch: "" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/rennzhang/blog" },
    ],
  },
  // head: [
  //   [
  //     "script",
  //     { src: "https://www.googletagmanager.com/gtag/js?id=your google" },
  //   ],
  //   [
  //     "script",
  //     {},
  //     `window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());

  //     gtag('config', 'your google');`,
  //   ],
  // ],
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  buildEnd: getRssFeed({
    author: {
      name: "rennzhang",
      email: "zr906155099@gmail.com",
    },
    links: links,
    baseUrl: "http://renkin.cn",
    copyright:
      "Copyright (c) 2023-present, rennzhang<zr906155099@gmail.com> and blog contributors",
  }),
});
