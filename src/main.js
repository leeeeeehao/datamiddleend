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

// 设置项目路由标题
router.beforeEach((to, from, next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
