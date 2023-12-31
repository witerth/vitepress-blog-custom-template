import dayjs from "dayjs";
import { ThemeConfig, Page } from "../types";
//@ts-ignore
import { data as contents } from "./content.data";

export const inBrowser = typeof document !== "undefined";
export const HASH_RE = /#.*$/;
export const EXT_RE = /(index)?\.(md|html)$/;
export const EXTERNAL_URL_RE = /^[a-z]+:/i;

type CategoryRecord = {
  pages: Page[];
  total: number;
  parent: string | null;
};
function buildCategoryMap(map: Map<string, CategoryRecord>, content: Page) {
  content.categoryAry.map((c, i, arr) => {
    const category: CategoryRecord = {
      pages: [content],
      total: 0,
      parent: null,
    };
    i > 1 && (category.parent = arr[i - 1]);
    if (!map.get(c)) {
      map.set(c, category);
    } else {
      const cur = map.get(c);
      cur!.pages?.push(content);
      content.src && cur!.total++;
    }
  });
}
const init = () => {
  const pageMap = new Map<string, Page>();
  const categoryMap = new Map<string, CategoryRecord>();
  const pageGroupByLayout = new Map<string, Page[]>();
  contents.forEach((content: Page) => {
    if (content.url.includes("post")) buildCategoryMap(categoryMap, content);
    // 转义中文
    const url = encodeURI(content.url);
    pageMap.set(url, content);
    const layout = content.frontmatter.layout;
    if (!layout) {
      return;
    }

    pageGroupByLayout.get(layout)?.push(content) ||
      pageGroupByLayout.set(layout, [content]);
  });

  return {
    pageMap,
    categoryMap,
    pageGroupByLayout,
  };
};

const { pageMap, categoryMap, pageGroupByLayout } = init();

/**
 * get path by route path
 * @param path route path
 * @returns Page
 */
const getPage = (path: string) => {
  return pageMap.get(path);
};

const sort = (pages: Page[], theme: ThemeConfig) => {
  let sort = "date";
  if (theme.sortBy) {
    sort = theme.sortBy;
  }

  return pages.sort((a, b) => {
    // @ts-ignore
    const val = b[sort] - a[sort];
    // const val = a[sort] - b[sort];
    return val;
  });
};

const getPages = (layout: string, theme: ThemeConfig) => {
  return sort(pageGroupByLayout.get(layout) || [], theme);
};

const defaultDataFormat = "YYYY-MM-DD";

const formatDate = (time: string | number, pattern?: string) => {
  if (pattern === undefined) {
    pattern = defaultDataFormat;
  }

  return dayjs(time).format(pattern);
};

const tagsUrl = (layout: string, tag: string) => {
  if (layout === "qamain") {
    return `/qa.html?tag=${tag}`;
  }
  return `/tags?layout=${layout}&tag=${tag}`;
};

export function isActive(
  currentPath: string,
  matchPath: string,
  asRegex = false
) {
  if (matchPath === undefined) {
    return false;
  }
  currentPath = normalize(`/${currentPath}`);
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }
  if (normalize(matchPath) !== currentPath) {
    return false;
  }
  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch) {
    return (inBrowser ? location.hash : "") === hashMatch[0];
  }
  return true;
}

export function normalize(path: string) {
  return decodeURI(path).replace(HASH_RE, "").replace(EXT_RE, "");
}
export function isExternal(path: string) {
  return EXTERNAL_URL_RE.test(path);
}
const formatDesc = (desc: string) => {
  var res = stripHtmlTags(desc);
  if (res.length > 100) {
    res = res.slice(0, 250) + "...";
  }
  return res;
};

const stripHtmlTags = (html: string) => {
  html = html.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
  return html;
};

function r(
  condition: boolean,
  ifTrue: () => JSX.Element,
  ifFalse?: () => JSX.Element
): JSX.Element {
  if (condition) {
    return ifTrue();
  }
  return ifFalse ? ifFalse() : (null as unknown as JSX.Element);
}

function rs(condition: boolean, ifTrue: string, ifFalse?: string): string {
  if (condition) {
    return ifTrue;
  }
  return ifFalse ? ifFalse : "";
}

export {
  contents as pages,
  r,
  rs,
  pageMap,
  categoryMap,
  pageGroupByLayout,
  formatDate,
  getPage,
  getPages,
  tagsUrl,
  formatDesc,
};
