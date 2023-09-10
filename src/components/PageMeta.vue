<script setup lang="ts">
import { useData } from "vitepress";
import { Page } from "../types";

import PageMetaInfo from "./PageMetaInfo";

const data = useData();
const layout = data.page.value.frontmatter.layout;

const props = defineProps<{
  page: Page;
  showEditLink: boolean;
  foratDatePattern?: string;
}>();

const showFunc = () => {
  if (layout === "home") {
    return false;
  }
  if (layout === "tags") {
    return false;
  }
  return true;
};

const show = computed(showFunc);
</script>

<template>
  <div
    class="page-meta flex items-center"
    :class="{
      'flex-col': show,
    }"
  >
    <PageMetaInfo
      :editLinkPattern="data.theme.value.editLink.pattern"
      :editLink="props.page.frontmatter.editLink"
      :editLinkText="data.theme.value.editLink.text"
      :relativePath="data.page.value.relativePath"
      :page="page"
      :show="show"
      :showEditLink="showEditLink"
      :foratDatePattern="foratDatePattern"
    />
  </div>
</template>
