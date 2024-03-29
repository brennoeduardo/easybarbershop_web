import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      options: {
        customProperties: true,
      },
      themes:{
        light: {
          dark: false,
          colors: {
            primary: '#009EE6',
            secondary: '#020202',
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})