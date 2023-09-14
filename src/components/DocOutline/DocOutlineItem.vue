<script setup lang="ts">
import { MenuItem } from "../types";

defineProps<{
  headers: MenuItem[];
  root?: boolean;
}>();
const activeLink = inject<Ref<string>>("activeLink");
function onClick(
  { target: el }: Event,
  data: Omit<MenuItem, "children" | "level">
) {
  const id = (el as HTMLAnchorElement).href!.split("#")[1];
  console.log(data);
  activeLink!.value = data.link;
  const heading = document.getElementById(decodeURIComponent(id));
  heading?.focus({ preventScroll: true });
}
</script>

<template>
  <ul>
    <li
    class="outline-item"
      v-for="{ children, link, title } in headers"
      :class="[root ? 'root' : 'nested', activeLink?.includes(link)?'active':'']"
    >
      <a
        class="outline-link"
        :class="{ active: activeLink?.includes(link) }"
        :href="link"
        @click="(e) => onClick(e, { link, title })"
        :title="title"
        >{{ title }}</a
      >
      <template v-if="children?.length">
        <DocOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style scoped lang="less">
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 16px;
}

.outline-link {
  display: block;
  line-height: 28px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 400;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}
.outline-item.active::before {
  content: "";
  position: absolute;
  // top: -4px;
  left: -13px;
  margin-top: 7px;
  width: 3px;
  height: 14px;
  background: var(--link-hover-color);
  border-radius: 2px;
}
.outline-link.nested {
  padding-left: 13px;
}
</style>
