export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  hub: {},
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
})
