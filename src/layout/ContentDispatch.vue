<script setup lang="ts">
import { useData } from "vitepress";
import Home from "./../layout/Home.vue";
import Post from "./Post.vue";
import Tags from "./Tags.vue";
import Doc from "./Doc";
import Links from "./Links.vue";
import Qa from "./Qa.vue";

const { frontmatter } = useData();
const shouldMb = () => {
  const val = frontmatter.value;
  return (
    val.layout === "post" ||
    val.layout === "issue" ||
    val.layout === "tags" ||
    val.layout === "links"
  );
};
</script>

<template>
  <div
    class="ContentDispatch center"
    :class="{
      'is-home': frontmatter.layout === 'home',
      'should-mb': shouldMb(),
    }"
  >
    <Home v-if="frontmatter.layout === 'home'" />
    <Post v-else-if="frontmatter.layout === 'post' ||frontmatter.layout === 'issue'" />
    <Doc
      v-else-if=" frontmatter.layout === 'doc'"
    />
    <Tags v-else-if="frontmatter.layout === 'tags'" />
    <Links v-else-if="frontmatter.layout === 'links'" />
    <Qa v-else-if="frontmatter.layout === 'qamain'" />
    <div v-else>
      <Content />
    </div>
  </div>
</template>

<style scoped>
.ContentDispatch {
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  margin: var(--vp-layout-top-height, 0px) auto 0;
  width: 100%;
}

.should-mb {
  padding-top: 6rem;
}

.ContentDispatch.is-home {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ContentDispatch.has-sidebar {
  margin: 0;
}
</style>
