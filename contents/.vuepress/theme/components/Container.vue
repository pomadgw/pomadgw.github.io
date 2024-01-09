<template>
  <div class="theme-container max-w-screen-xl m-auto bg-white">
    <nav-bar />
    <div :style="customImage" class="bg-cover bg-center bg-header-intro-img h-96"></div>
    <slot />
    <p-footer />
  </div>
</template>
<script>
import NavBar from './NavBar'
import PFooter from './Footer'

export default {
  name: 'Container',
  components: {
    PFooter,
    NavBar
  },
  computed: {
    customImage() {
      if (this.$frontmatter.image) {
        return `background-image: url(${this.$frontmatter.image})`
      }

      return ''
    }
  },
}
</script>
