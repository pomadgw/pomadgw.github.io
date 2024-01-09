import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default (app: App) => {
  library.add(faTwitter, faGithub, fab)
  app.component('font-awesome-icon', FontAwesomeIcon)
}
