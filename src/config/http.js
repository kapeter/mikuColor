import axios from 'axios'
import conf from './config/conf.js'


const Http = {
  install(Vue, options) {
    Vue.mixin({
      mounted() {
        console.log('Mounted!');
      }
    });
  }
};

export default Http
