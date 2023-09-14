import { formatDesc } from "../utils";
import { Page } from "../types";
import PageMeta from "../components/PageMeta.vue";
import PageMetaTag from "./PageMetaTag";
import { useData } from "vitepress";
interface Props {
  hasCover: boolean;
  page: Page;
}

export default ({ hasCover, page }: Props) => {
  const data = useData();
  const layout = data.page.value.frontmatter.layout;
  return (
    <div class={hasCover ? "grid grid-flow-row-dense" : ""}>
      <div class="entry-header">
        <h2 class="text-2xl">{page.title}</h2>
      </div>
      <PageMeta showEditLink={false} page={page} />

      <hr />
      <div class={`entry-content  123 ${hasCover ? " line-3 " : ""} `}>
        <p class="text-4">{formatDesc(page.desc)}</p>
      </div>

      <div class={"entry-footer"}>
        {page.frontmatter.tags && (
          <PageMetaTag
            layout={layout}
            tags={page.frontmatter.tags}
            show={true}
          />
        )}
      </div>
    </div>
  );
};
