import axios from '~/plugins/axios'

export default function ({ store }) {
  if (store.state.catLists.length < 1) {
    return axios.get('category')
      .then(function (res) {
        let catLists = res.data.data
        catLists = catLists.filter((cat) => {
          if (cat.detail.count > 0) {
            return true
          } else {
            return false
          }
        })
        store.commit('setCategory', catLists)
      })
  }
}
