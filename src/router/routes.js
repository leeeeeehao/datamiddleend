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
        path:'/databaseList',
        meta:{
          title:'数据源列表',
          model: '数据源'
        },
        component: () => import('../views/database/DatabaseList.vue')
      },{
        path:'/tableList',
        name: 'tableList',
        meta:{
          title:'数据源表列表',
          model: '数据源列表'
        },
        component: () => import('../views/database/TableList.vue')
      },{
        path:'/fieldList',
        name: 'fieldList',
        meta:{
          title:'字段列表',
          model: '数据源表列表'
        },
        component: () => import('../views/database/FieldList.vue')
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
        path: '/transformEdit',
        meta: {
          title: '编辑转换',
          model: '转换列表'
        },
        component: () => import('../views/transform/TransformEdit.vue')
      },
      {
        path: '/serverManagement',
        meta: {
          model: '系统版本',
          title: '服务器管理'
        },
        component: () => import('@/views/systemVersion/ServerManagement.vue')
      },
      {
        path: '/serviceManagement',
        meta: {
          model: '系统版本',
          title: '服务管理'
        },
        component: () => import('@/views/systemVersion/ServiceManagement.vue')
      },
      {
        path: '/clusterManagement',
        meta: {
          model: '系统版本',
          title: '集群管理'
        },
        component: () => import('@/views/systemVersion/ClusterManagement.vue')
      },
      {
        path: '/versionManagement',
        meta: {
          model: '系统版本',
          title: '编目管理'
        },
        component: () => import('@/views/systemVersion/VersionManagement.vue')
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
