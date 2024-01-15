<template>
  <footer class="text-center px-12 pb-12 mb-12">
    <div class="mb-6 flex justify-evenly print:hidden">
      <div class="flex gap-2 items-center">
        <span class="select-none">𝕏</span>
        <a
          href="https://twitter.com/pomadgw"
          target="_blank"
          rel="noopener noreferrer"
          >@pomadgw</a
        >
      </div>
      <div class="flex gap-2 items-center">
        <font-awesome-icon :icon="github" class="h-4" />
        <a
          href="https://github.com/pomadgw"
          target="_blank"
          rel="noopener noreferrer"
          >pomadgw</a
        >
      </div>
    </div>

    &copy; 2016 - {{ thisYear }} pomadgw
  </footer>
</template>
<script setup lang="ts">
import { icon } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const github = icon({ prefix: 'fab', iconName: 'github' })
const twitter = icon({ prefix: 'fab', iconName: 'twitter' })

const thisYear = new Date().getFullYear()
</script>
