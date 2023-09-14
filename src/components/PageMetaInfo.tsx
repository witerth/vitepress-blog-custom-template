import { Page } from "../types";
import FolderIcon from "~icons/jam/folder-f";
import TimeIcon from "~icons/mingcute/time-line";
interface Props {
  show: boolean;
  showEditLink: boolean;
  page: Page;
  editLinkPattern: any;
  relativePath: string;
  editLink: string;
  editLinkText: string;
  foratDatePattern?: string;
}

const editLink = ({ editLinkPattern, relativePath, editLink }: Props) => {
  // preset editLink
  if (editLink) {
    return editLink;
  }

  if (typeof editLinkPattern === "function") {
    return editLinkPattern({ relativePath: relativePath });
  }
  return editLinkPattern.replace(":path", relativePath);
};

export default (porps: Props) => {
  const { show, page, showEditLink, editLinkText, foratDatePattern } = porps;
  const category = computed(() => page.category.replace("posts/",""));
  return (
    <div class="dark:text-dark-text/[.86] page-meta flex flex-wrap items-center text-sm my-2">
      <div class="new-meta-item author">
        <a href="renkin.cn" rel="nofollow">
          renkin
        </a>
      </div>
      <div class="new-meta-item date">
        <div class="inline-block text-sm mr-4 flex items-center">
          <TimeIcon></TimeIcon>
          <span class="ml-1">{formatDate(page.update||page.date, foratDatePattern)}</span>
        </div>
      </div>
      <div class="new-meta-item category">
        <div class="inline-block text-sm mr-4 flex items-center">
          <FolderIcon></FolderIcon>
          <span class="ml-1">{category.value}</span>
        </div>
        {/* <a href="/blog/categories/91天学算法/" rel="nofollow">
            <i class="fas fa-folder-open" aria-hidden="true"></i>
            <p>力扣加加&nbsp;/&nbsp;91天学算法</p>
          </a> */}
      </div>
      {/* <div class="new-meta-item top-post">
          <a class="notlink">
            <i class="fas fa-angle-double-up" aria-hidden="true"></i>
            <p>置顶</p>
          </a>
        </div> */}
      <div style="margin-right: 10px;">
        {/* <span class="post-time">
              <span class="post-meta-item-icon">
                <i class="fa fa-keyboard"></i>
                <span class="post-meta-item-text"> 字数统计: </span>
                <span class="post-count">3.1k字</span>
              </span>
            </span> */}
        {/* &nbsp; | &nbsp;
            <span class="post-time">
              <span class="post-meta-item-icon">
                <i class="fa fa-hourglass-half"></i>
                <span class="post-meta-item-text"> 阅读时长≈</span>
                <span class="post-count">10分</span>
              </span>
            </span> */}
      </div>

      {showEditLink ? (
        <div class="inline-block">
          <span
            class={`\
            pl-2 border-solid border-l-2\
            border-l-blue-1\
            dark:border-l-white/40\
            edit-link-border\
          `}
          />
          <a class={""} href={editLink(porps)} target="_blank">
            {editLinkText}{" "}
          </a>
        </div>
      ) : (
        <span></span>
      )}{" "}
    </div>
  );
};
