<template>
  <nav class="nav flex px-12 py-6">
    <div class="nav-header flex-1">
      <a href="/" class="text-xl text-black">{{ SITE_TITLE }}</a>
    </div>
    <div class="nav-content flex">
      <div
        v-for="{ title, path } in pages"
        :key="path"
        :class="{ 'font-bold': path === currentPage }"
        class="first:ml-0 ml-6"
      >
        <a :href="path" class="text-gray-600 hover:underline">{{ title }}</a>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { SITE_TITLE } from "../consts";

defineProps({
  currentPage: {
    type: String,
    required: true,
  },
});

const pages = ref([
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
]);

// export default {
//   computed: {
//     pages() {
//       return this.$site.pages.filter(page => page.frontmatter.show_on_navbar)
//     }
//   }
// }
</script>
