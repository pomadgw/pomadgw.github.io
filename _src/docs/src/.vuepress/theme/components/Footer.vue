<template>
  <footer class="text-center px-12 pb-12 mb-12">
    <div class="mb-6 flex justify-evenly">
      <div>
        <fa-icon :icon="['fab', 'twitter']" />
        <a href="https://twitter.com/pomadgw" target="_blank" rel="noopener noreferrer">@pomadgw</a>
      </div>
      <div>
        <fa-icon :icon="['fab', 'github']" />
      <a href="https://github.com/pomadgw" target="_blank" rel="noopener noreferrer">pomadgw</a>
      </div>
    </div>

    &copy; 2016 - 2021 pomadgw
  </footer>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTwitter)
library.add(faGithub)

export default {
  name: 'PFooter',
  components: {
    FaIcon: FontAwesomeIcon
  }
}
</script>
