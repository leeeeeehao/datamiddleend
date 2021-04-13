import Login from '../views/user/Login.vue'
import Home from '../views/home/home.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/forGetPwd',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/user/ForGetPwd.vue')
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    redirect: '/welcome',
    children: [
      {
        path:'/welcome',
        meta:{
          title:'欢迎页'
        },
        component: () => import('../views/common/welcome.vue')
      },
      {
        path: '/transformList',
        meta: {
          title: '转换列表',
          model: '转换'
        },
        component: () => import('../views/transform/TransformList.vue')
      },
      {
        path: '/LicenseManagement',
        meta: {
          title: '证照列表',
          model: '证照列表'
        },
        component: () => import('../views/license/LicenseManagement.vue')
      },
      {
        path: '/LicenseInfo',
        name:'licenseInfo',
        meta: {
          title: '证照信息',
          model: '证照信息'
        },
        component: () => import('../views/license/LicenseInfo.vue')
      },
      {
        path: '/displayPersonalInfo',
        meta: {
          title: '个人信息'
        },
        component: () => import('@/views/user/DisplayPersonalInfo.vue')
      },
      {
        path: '/changePersonalPwd',
        meta: {
          title: '修改密码'
        },
        component: () => import('@/views/user/ChangePersonalPwd.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/common/404.vue')
  }

]

export default routes
