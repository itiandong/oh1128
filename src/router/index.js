import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '防控概览', icon: 'dashboard' }
    }]
  },

  {
    path: '/detection',
    component: Layout,
    redirect: '/detection/assessment',
    name: 'Detection',
    meta: { title: '土壤污染检测', icon: 'skill' },
    children: [
      {
        path: 'assessment',
        name: 'Assessment',
        component: () => import('@/views/detection/index'),
        redirect: '/detection/assessment/singleland',
        meta: { title: '污染评价' },
        children: [
          {
            path: 'singleland',
            name: 'Singleland',
            component: () => import('@/views/detection/singleland'),
            meta: { title: '土壤单因子' }
          },
          {
            path: 'multipleland',
            name: 'Multipleland',
            component: () => import('@/views/detection/multipleland'),
            meta: { title: '土壤多因子' }
          },
          {
            path: 'accumulation',
            name: 'Accumulation',
            component: () => import('@/views/detection/'),
            meta: { title: '土壤地累计指数' }
          },
          {
            path: 'singlecrop',
            name: 'Singlecrop',
            component: () => import('@/views/detection/'),
            meta: { title: '作物单因子' }
          }
        ]
      },
      {
        path: 'risk',
        name: 'Risk',
        component: () => import('@/views/table/index'),
        alwaysShow: true,
        meta: { title: '风险评价' },
        children: [
          {
            path: 'hankson',
            name: 'Hankson',
            component: () => import('@/views/table/index'),
            meta: { title: '潜在生态危害评价' }
          }
        ]
      }
    ]
  },

  {
    path: '/trace',
    component: Layout,
    name: 'Trace',
    meta: { title: '土壤污染溯源', icon: 'search' },
    children: [
      {
        path: 'cluster',
        name: 'Cluster',
        component: () => import('@/views/form/index'),
        meta: { title: '聚类溯源' }
      },
      {
        path: 'decisiontree',
        name: 'Decisiontree',
        component: () => import('@/views/form/index'),
        meta: { title: '决策树溯源' }
      },
      {
        path: 'randomforest',
        name: 'Randomforest',
        component: () => import('@/views/form/index'),
        meta: { title: '随机森林溯源' }
      }
    ]
  },

  {
    path: '/binary',
    component: Layout,
    name: 'Binary',
    meta: { title: '土植关联分析', icon: 'example' },
    children: [
      {
        path: 'enrichment',
        name: 'Enrichment',
        component: () => import('@/views/form/index'),
        meta: { title: '作物富集分析' }
      },
      {
        path: 'singlerelate',
        name: 'Singlerelate',
        component: () => import('@/views/form/index'),
        meta: { title: '土壤作物相关分析' }
      },
      {
        path: 'multiplerelate',
        name: 'Multiplerelate',
        component: () => import('@/views/form/index'),
        meta: { title: '多元回归分析' }
      },
      {
        path: 'comprehensive',
        name: 'Comprehensiveanalysis',
        component: () => import('@/views/form/index'),
        meta: { title: '综合质量影响指数分析' }
      }
    ]
  },

  {
    path: '/protect',
    component: Layout,
    name: 'Protect',
    meta: { title: '污染防控监测', icon: 'eye-open' },
    children: [
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: () => import('@/views/form/index'),
        meta: { title: '防控知识库' }
      },
      {
        path: 'partition',
        name: 'Partition',
        component: () => import('@/views/form/index'),
        meta: { title: '防控分区' }
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/form/index'),
        meta: { title: '防控监测' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
