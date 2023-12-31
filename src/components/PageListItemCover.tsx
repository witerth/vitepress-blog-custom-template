import { Page } from "../types";

interface Props {
  page: Page;
  position: "left" | "right" | "top";
}

export default ({ page, position }: Props) => {
  const cover = page.frontmatter.cover;
  if (!cover) {
    return <div />;
  }

  return (
    <div class={`page-meta-cover ${"page-meta-cover-" + position}`}>
      <img class={position === "top" ? "" : "h-[215px]"} src={cover.image} />
    </div>
  );
};
