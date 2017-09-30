import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiUrl: {
      category: 'category',
      setting: 'setting'
    },
    catLists: []
  },
  mutations: {
    getCategory (state, data) {
      state.catLists = data
    },
    pageConf (state, data) {
      data.forEach((item) => {
        let oMeta = document.createElement('meta')
        switch (item.name) {
          case 'app_name':
            document.title = item.value
            break
          case 'app_description':
            oMeta.setAttribute('name', 'description')
            oMeta.setAttribute('content', item.value)
            document.getElementsByTagName('head')[0].appendChild(oMeta)
            break
          case 'app_keyword':
            oMeta.setAttribute('name', 'keywords')
            oMeta.setAttribute('content', item.value)
            document.getElementsByTagName('head')[0].appendChild(oMeta)
            break
        }
      })
    }
  },
  actions: {
    getCategory (context) {
      Vue.http.get(context.state.apiUrl.category)
        .then(function (res) {
          context.commit('getCategory', res.data.data)
        })
    },
    config (context) {
      Vue.http.get(context.state.apiUrl.setting)
        .then(function (res) {
          context.commit('pageConf', res.data.data)
        })
    }
  }
})

export default store
