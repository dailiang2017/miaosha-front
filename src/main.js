// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import global from './components/common/Global'

axios.defaults.baseURL = 'http://localhost:8090/'
axios.defaults.headers['Content-type'] = "application/json;charset=utf-8"
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$global = global

axios.interceptors.response.use((response) => {
  if (response.headers["x-auth-token"]) {
    router.push({path: '/'});
  }
  return response
}, (error) => {
  return error;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
