const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/element-ui',
      ssr: true //是能在服务端运行
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  script: [
    {
      src:
        'http://api.map.baidu.com/api?v=2.0&ak=itq41hB0USBoLG6Gai6hKE35yYCVAPiL&callback=initMap'
    }
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.unshift(
        {
          name: 'login',
          path: '/:city/login',
          component: '@/views/login.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'register',
          path: '/:city/register',
          component: '@/views/register.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'exit',
          path: '/exit',
          component: '@/views/exit.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'home',
          path: '/:city/',
          component: '@/views/index.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'changeCity',
          path: '/:city/changeCity/',
          component: '@/views/changeCity.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'products',
          path: '/:city/products/',
          component: '@/views/products.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'detail',
          path: '/:city/products/detail/',
          component: '@/views/detail.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'cart',
          path: '/:city/products/cart/',
          component: '@/views/cart.vue',
          pathToRegexpOptions: { strict: true }
        },
        {
          name: 'order',
          path: '/:city/products/order/',
          component: '@/views/order.vue',
          pathToRegexpOptions: { strict: true }
        },
      )
    }

  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    cache: false   //加快编译速度
  }
}
