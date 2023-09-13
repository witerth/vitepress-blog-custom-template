<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import PageMeta from "../components/PageMeta.vue";
import { getPage } from "../utils";
import MainContent from "../components/MainContent";
import CommentList from "../components/CommentList";
import DocOutline from "../components/DocOutline/DocOutline.vue";
import { Page } from "@/types";
const route = useRoute();

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
);

const page = computed(() => {
  return getPage(route.path) as Page;
});

const { site } = useData();

const showComment = () => {
  if (
    site.value.themeConfig.issues &&
    site.value.themeConfig.issues.showComment
  ) {
    return true;
  }

  return false;
};
</script>

<template>
  <div class="post-container center">
    <MainContent>
      <header class="post-title text-center">
        <h1>{{ page?.title }}</h1>
      </header>
      <PageMeta :show-edit-link="true" :page="page" />
      <Content
        class="post-content vp-doc dark:prose-invert"
        :class="pageName"
      />
      <footer
        class="post-content"
        v-if="page?.frontmatter.layout == 'issue' && showComment()"
      >
        <CommentList
          :id="page.frontmatter.id"
          :editUrl="page.frontmatter.editLink"
        />
      </footer>
    </MainContent>
    <DocOutline></DocOutline>
  </div>
</template>

<style scoped>
.post-container {
  width: 100%;
  padding: 30px 20px 0;
}
.main-content-center {
  display: flex;
  justify-content: center;
  padding: 30px 40px;
  width: calc(100% - 252px);
  /* background: #fff !important; */
  background-color: var(--vp-nav-bg-color);
  font-family: -apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
    background-image: linear-gradient(90deg,rgba(159,219,252,.15) 3%,transparent 0),linear-gradient(1turn,rgba(159,219,252,.15) 3%,transparent 0);
    background-size: 20px 20px;
    background-position: 50%;

}
.main-content-solot {
  width: 100%;
}
@media screen and (min-width: 768px) {
  .post-container {
    @apply max-w-[1080px] min-w-[700px] xl:mr-20 xl:ml-20;
  }

}
@media screen and (max-width: 768px) {

  .main-content-center {
  width: 100%;

  }
}

@media (min-width: 1480px) {
  .post-container {
    min-width: 640px;
  }
}
</style>
