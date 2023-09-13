<script setup lang="ts">
import { useData, useRoute, } from 'vitepress'
import { computed, provide, useSlots, watch } from 'vue'
import VPFooter from "vitepress/dist/client/theme-default/components/VPFooter.vue";
import VPLocalNav from "vitepress/dist/client/theme-default/components/VPLocalNav.vue";
import VPNav from "vitepress/dist/client/theme-default/components/VPNav.vue";
import VPSidebar from "vitepress/dist/client/theme-default/components/VPSidebar.vue";
import VPSkipLink from "vitepress/dist/client/theme-default/components/VPSkipLink.vue";
import VPBackdrop from "vitepress/dist/client/theme-default/components/VPBackdrop.vue";
import { useCloseSidebarOnEscape, useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";
import { useNav } from "vitepress/dist/client/theme-default/composables/nav";
import ContentDispatch from "./layout/ContentDispatch.vue";
import NotFound from "./NotFound.vue";
const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
  isSidebarEnabled,
} = useSidebar()
const { isScreenOpen } = useNav()

const route = useRoute()
watch(() => route.path, closeSidebar)

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

const { page,frontmatter } = useData()

const slots = useSlots()
const heroImageSlotExists = computed(() => !!slots['home-hero-image'])

provide('hero-image-slot-exists', heroImageSlotExists)
</script>

<template>
  <div v-if="frontmatter.layout !== false" class="Layout" :class="frontmatter.pageClass" >
    <slot name="layout-top" />
    <VPSkipLink :inert="isSidebarOpen || isScreenOpen" />
    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <VPNav v-if="frontmatter.navbar !== false" :inert="isSidebarOpen">
      <template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
      <template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
      <template #nav-bar-content-before><slot name="nav-bar-content-before" /></template>
      <template #nav-bar-content-after><slot name="nav-bar-content-after" /></template>
      <template #nav-screen-content-before><slot name="nav-screen-content-before" /></template>
      <template #nav-screen-content-after><slot name="nav-screen-content-after" /></template>
    </VPNav>
    <VPLocalNav :inert="isSidebarOpen || isScreenOpen" :open="isSidebarOpen" @open-menu="openSidebar" />

    <VPSidebar :inert="!isSidebarEnabled && (!isSidebarOpen || isScreenOpen)" :open="isSidebarOpen">
      <template #sidebar-nav-before><slot name="sidebar-nav-before" /></template>
      <template #sidebar-nav-after><slot name="sidebar-nav-after" /></template>
    </VPSidebar>
    <NotFound v-if="page.isNotFound" />
    <ContentDispatch v-else />
    <div class="my-[100px]"></div>
    <VPFooter :inert="isSidebarOpen || isScreenOpen" />
    <slot name="layout-bottom" />
  </div>
  <Content v-else />
</template>

<style scoped>
.Layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
