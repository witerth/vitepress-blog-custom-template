<template>
  <div class="custom-doc-outline default-shadow">
    <div class="pt-1 pb-2">文章大纲</div>
    <hr class="mb-3" />
    <div class="custom-doc-outline-content">
      <DocOutlineItem :headers="headers" :root="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onContentUpdated } from "vitepress";
import DocOutlineItem from "./DocOutlineItem.vue";
import { MenuItem } from "../types";
function getHeaders(range: number[]) {
  const headers = [...document.querySelectorAll(".VPDoc h2,h2,h3,h4,h5,h6")]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1]);
      return {
        title: serializeHeader(el),
        link: "#" + el.id,
        level,
      };
    });
  return resolveHeaders(headers, range);
}

function serializeHeader(h: any) {
  let ret = "";
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (
        node.classList.contains("VPBadge") ||
        node.classList.contains("header-anchor")
      ) {
        continue;
      }
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
function resolveHeaders(headers: MenuItem[], range: number[]) {
  const [high, low] = range;
  headers = headers.filter((h) => h.level >= high && h.level <= low);
  const ret = [];
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i];
    if (i === 0) {
      ret.push(cur);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j];
        if (prev.level < cur.level) {
          (prev.children || (prev.children = [])).push(cur);
          continue outer;
        }
      }
      ret.push(cur);
    }
  }
  return ret;
}
const headers = shallowRef<MenuItem[]>([]);

onContentUpdated(() => {
  headers.value = getHeaders([2, 4]);
});

const activeLink = ref("");
provide("activeLink", activeLink);
</script>

<style scoped lang="less">
.custom-scrollbar(@height) {
  &::-webkit-scrollbar {
    width: 4px;
    height: @height;
    background-color: var(--color1);
    outline: none;
    border-radius: 50px;
  }
}
.custom-doc-outline {
  width: 240px;
  background-color: var(--vp-nav-bg-color);
  min-height: 300px;
  max-height: 360px;
  padding: 12px;
  margin-left: 12px;
  position: sticky;
  top: calc(30px + 3rem);
}
.custom-doc-outline-content {
  overflow-y: auto;
  height: calc(100% - 72px);
  .custom-scrollbar(20px)
}
@media screen and (max-width: 780px) {
  .custom-doc-outline {
    display: none;
  }
}

@media (min-width: 1480px) {
  .post-content {
    min-width: 640px;
  }
}
</style>
