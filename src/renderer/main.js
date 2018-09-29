import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import App from '@/App'
import router from '@/router'
import store from '@/store'

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
