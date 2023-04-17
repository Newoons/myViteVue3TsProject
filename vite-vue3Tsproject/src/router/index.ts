import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/homeIndex',
    children: [
      //首页
      {
        path: '/homeIndex',
        name: 'homeIndex',//导航栏显示需要，一定要加上
        component: () => import('../views/homepage/homeIndex.vue'),
        meta: {
          title: '首页',
          keepAlive: false,//是否缓存页面
        },
      },
      //Excel服务
      {
        path: '/excelservice',
        name: 'excelservice',//导航栏显示需要，一定要加上
        meta: {
          title: 'Excel服务',
        },
        children: [
          {
            name: 'dataSystem',
            path: 'dataSystem',
            component: () => import('../views/excelservice/dataSystem.vue'),
            meta: {
              title: '数据系统',
              keepAlive: false,//是否缓存页面
            }
          },
          {
            name: 'exportManagement',
            path: 'exportManagement',
            component: () => import('../views/excelservice/exportManagement.vue'),
            meta: {
              title: '导出管理',
              keepAlive: false,//是否缓存页面
            }
          },
          {
            name: 'multipleTableMerge',
            path: 'multipleTableMerge',
            component: () => import('../views/excelservice/multipleTableMerge.vue'),
            meta: {
              title: '多表合并',
              keepAlive: false,//是否缓存页面
            }
          },
          {
            name: 'exportLog',
            path: 'exportLog',
            component: () => import('../views/excelservice/exportLog.vue'),
            meta: {
              title: '导出日志',
              keepAlive: false,//是否缓存页面
            }
          },
        ]
      },
    ]
  },
  // 404异常页面
  {
    path: '/:catchAll(.*)',
    name: 'abnormal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/abnormal/404.vue')
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),//process.dev 在vite已被弃用 改为import.meta.env
  routes
})

export default router
