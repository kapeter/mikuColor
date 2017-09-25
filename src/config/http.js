import axios from 'axios'
import conf from './conf'

const Http = {
  install (Vue, options) {
    const http = axios.create({
      baseURL: conf.baseUrl !== '' ? conf.baseUrl : 'http://' + window.location.host + '/api/',
      validateStatus: function (status) {
        return status <= 405
      }
    })

    // 1.通过 Vue.http 调用
    Vue.http = http
    // 2.通过 this.$http 调用
    Vue.prototype.$http = http
  }
}

export default Http
