export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'tip',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home/Home.vue'),
    children: [
      {
        path: 'tip',
        name: 'tip',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Tip/Tip.vue'),
        meta: {
          isShowFlotatButton: true
        }
      },
      {
        path: 'accordion',
        name: 'accordion',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Accordion/Accordion.vue'),
        meta: {
          isShowFlotatButton: true
        }
      },
      {
        path: 'dialog',
        name: 'dialog',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Dialog/Dialog.vue'),
        meta: {
          isShowFlotatButton: true
        }
      },
      {
        path: 'nomaskdialog',
        name: 'nomaskdialog',
        component: () => import(/* webpackChunkName: "about" */ '@/views/NoMaskDialog/NoMaskDialog.vue'),
        meta: {
          isShowFlotatButton: true
        }
      },
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Table/Table.vue'),
        meta: {
          isShowFlotatButton: true
        }
      },
      {
        path: 'popover',
        name: 'popover',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Popover/PopoverBox.vue')

      }
    ]
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]
