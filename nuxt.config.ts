// https://nuxt.com/docs/api/configuration/nuxt-config

const API_URL = 'http://localhost:8000/api'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
  ],

  components: true,

  runtimeConfig: {
    public: {
        apiURL: API_URL,
    },
  },

})
