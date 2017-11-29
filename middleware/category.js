import axios from '~/plugins/axios'

export default function ({ store }) {
  if (store.state.catLists.length < 1) {
    return axios.get('category')
      .then(function (res) {
        store.commit('setCategory', res.data.data)
      })
  }
}
