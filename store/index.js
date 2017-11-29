import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    catLists: []
  },
  mutations: {
    setCategory (state, data) {
      state.catLists = data
    }
  }
})

export default store
