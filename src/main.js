// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResourse from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/js/extend.proto'

Vue.use(VueResourse)
Vue.use(ElementUI)

Vue.config.productionTip = false

// window.SERVE_URl = window.location.origin + '/';
// window.SERVE_URl = 'http://47.74.177.245:8099/';
window.SERVE_URl = 'http://120.76.133.244:8099/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
