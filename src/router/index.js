import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'


Vue.use(VueRouter)


const router = new VueRouter({
  routes
})

// 全局前置守卫 路由拦截器
/*
  to: 去哪里的路由
  from: 从哪里来的路由
*/
router.beforeEach((to, from, next) => {
  // if (to.path === '/login' || to.path === '/forGetPwd') return next()
  // NProgress.start()
	// // 获得token
	// const tokenStr = window.sessionStorage.getItem('token')
	// //如果token不存在 强制跳转到login
	// if (!tokenStr) return next('/login')
	next()
})

// 路由跳转之后
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
