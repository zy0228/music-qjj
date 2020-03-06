import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

import VConsole from 'vconsole'
/* eslint-disable no-unused-vars */
// var vconsole = new VConsole()

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
