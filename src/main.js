import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/hy.mixin'
import 'nprogress/nprogress.css'


// 关闭生产提示
Vue.config.productionTip = false
// 关闭调试插件提示
Vue.config.devtools = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
