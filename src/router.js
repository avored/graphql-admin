import Vue from 'vue'
import Router from 'vue-router'
import AdminDashboard from './views/AdminDashboard.vue'
import Guest from './middleware/guest';
import Auth from './middleware/auth';
import isNil from 'lodash/isNil';

import Catalog from './views/catalog/Catalog.vue'

import CategoryIndex from './views/catalog/category/CategoryIndex.vue'
import CategoryCreate from './views/catalog/category/CategoryCreate.vue'
import CategoryEdit from './views/catalog/category/CategoryEdit.vue'
import ProductIndex from './views/catalog/product/ProductIndex.vue'

Vue.use(Router)
let router = new Router({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: [
        { path: '/', redirect: '/admin/dashboard', displayInSidebar: false },
        {
          path: '/admin/dashboard',
          name: 'admin.dashboard',
          label: 'Dashboard',
          icon: 'dashboard',
          component: AdminDashboard,
          displayInSidebar: true,
          meta: {'middleware': {auth: Auth}, 'layout': 'app' }
        },
        {
          path: '/admin/catalog',
          name: 'admin.catalog',
          label: 'Catalog',
          icon: 'dashboard',
          displayInSidebar: true,
          component: Catalog,
          meta: {'middleware': {auth: Auth}},
          children: [
              {
                path: 'product',
                component: ProductIndex,
                name: 'admin.product',
                label: 'Product',
                meta: {'middleware': {auth: Auth}},
              },
              {
                path: 'category',
                component: CategoryIndex,
                name: 'admin.category.index',
                label: 'Category',
                meta: {'middleware': {auth: Auth}},
              },
              {
                path: 'category/create',
                component: CategoryCreate,
                name: 'admin.category.create',
                label: 'Category Create',
                meta: {'middleware': {auth: Auth}},
              },
              {
                path: 'category/:id/edit',
                component: CategoryEdit,
                name: 'admin.category.edit',
                label: 'Category Edit',
                meta: {'middleware': {auth: Auth}},
              }
          ]
        },
        {
          path: '/admin/login',
          name: 'admin-login',
          displayInSidebar: false,
          component: () => import('./views/admin/auth/Login.vue'),
          meta: {'middleware': {guest: Guest}, 'layout': 'login' }
        }
      ]
    });


// GLobal BEFORE hooks:
router.beforeEach((to, from, next) => { 
  
  if (!isNil(to.meta.middleware))
  {
      Object.keys(to.meta.middleware).map(function(objectKey) {
          if (objectKey === "guest") {
            if (to.meta.middleware[objectKey](to))
            {
              next();
            } else {
              next()
            }
          }
          if (objectKey === "auth") {
            if (!to.meta.middleware[objectKey](to))
            {
                next('/admin/login');
            } else {
              next()
            }
          }
      });
     
    } else {
      next()
    }

})

export default router;
