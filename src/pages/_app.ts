import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default (app: App): void => {
  library.add(faTwitter, faGithub)
  app.component('font-awesome-icon', FontAwesomeIcon)
}
