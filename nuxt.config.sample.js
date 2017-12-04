module.exports = {
  env: {
    apiUrl: 'http://api.myapp.com/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'My Title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Description' }
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
    vendor: ['axios'],

    babel: {
      "presets": [
        ["env", { "modules": false }],
        "stage-2"
      ],
      "plugins": ["transform-runtime"],
    }
  },

  //引入全局css变量
  css: [
    '~assets/css/index.css'
  ],

  // // 页面过渡效果
  // transition: {
  //   name: 'page',
  //   mode: 'out-in',
  //   enterActiveClass: 'animated fadeInRight',
  //   leaveActiveClass: 'animated fadeOutLeft'
  // }
}
