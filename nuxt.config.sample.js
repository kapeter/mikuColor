module.exports = {
  env: {
    apiUrl: 'https://api.app.com/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'My Title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Description' },
      { hid: 'keywords', name: 'keywords', content: 'My KeyWords' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#39c5bb' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: {
      allChunks: true
    },
    postcss: {
      plugins: {
        'autoprefixer': {}
      }
    },
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    // 防止重复引入
    vendor: [
      'axios', 
      'vue-lazyload'
    ],

    babel: {
      "presets": [
        ["env", { "modules": false }],
        "stage-2"
      ],
      "plugins": ["transform-runtime"],
    },
  },


  // vue插件
  plugins: [
    { src: '~/plugins/vue-lazyload', ssr: false }
  ],

  //引入全局css变量
  css: [
    '~assets/css/normalize.css',
    '~assets/less/common.less'
  ]
}
