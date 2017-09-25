import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiUrl: {
      category: 'category'
    },
    catLists: []
  },
  mutations: {
    getCategory (state, data) {
      state.catLists = data
    }
  },
  actions: {
    getCategory (context) {
      Vue.http.get(context.state.apiUrl.category)
        .then(function (res) {
          context.commit('getCategory', res.data.data)
        })
    }
  }
})

export default store
