import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    catLists: [],
    audioIsPlayed: false,
    title: 'Kapeter',
    subTitle: ''
  },
  getters: {
    audioState: state => {
      return state.audioIsPlayed
    },
    pageTitle: state => {
      return state.title
    },
    pageSubTitle: state => {
      return state.subTitle
    }
  },
  mutations: {
    setCategory (state, data) {
      state.catLists = data
    },
    toggleAudio (state) {
      state.audioIsPlayed = !state.audioIsPlayed
    },

    setTitle (state, data) {
      state.title = data.title
      state.subTitle = data.subTitle
    }
  }
})

export default store
