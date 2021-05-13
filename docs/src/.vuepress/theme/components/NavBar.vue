<template>
  <nav class="nav px-12 py-6">
    <div class="nav-header mb-6">
      <a href="/" class="text-xl text-black">pomadgw's blog</a>
    </div>
    <div class="nav-content flex">
      <div v-for="({ title, path }) in pages" :key="path" class="first:ml-0 ml-6">
        <a :href="path" class="text-gray-600 hover:underline">{{ title }}</a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    pages() {
      return this.$site.pages.filter(page => page.frontmatter.show_on_navbar)
    }
  }
}
</script>
