interface Props {
  show: boolean;
  tags: string[];
  layout: string;
}
import TagIcon from "~icons/solar/tag-bold";

const tagList = (tags: string[], layout: string) => {
  return tags.map((tag) => {
    return (
      <span class="page-tag">
        <a class={"flex items-center ml-1 mr-4"} href={tagsUrl("post", tag)}>
          <TagIcon></TagIcon>
          <span class={"ml-1"}>  {tag}</span>
        </a>
      </span>
    );
  });
};

export default ({ show, tags, layout }: Props) => {
  return (
    <div
      class={`meta-tag-list flex flex-wrap ${
        show ? "" : " basis-3/5 flex-grow "
      }`}
    >
      {tagList(tags, layout)}
    </div>
  );
};
