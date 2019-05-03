import Vue from 'vue'
import Router from 'vue-router'
import AdminDashboard from './views/AdminDashboard.vue'
import Guest from './middleware/guest';
import Auth from './middleware/auth';
import isNil from 'lodash/isNil';

import Catalog from './views/catalog/Catalog.vue'

import CategoryIndex from './views/catalog/category/CategoryIndex.vue'
import ProductIndex from './views/catalog/product/ProductIndex.vue'

Vue.use(Router)
let router = new Router({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: [
        { path: '/', redirect: '/admin/dashboard', displayInSidebar: false },
        {
          path: '/admin/dashboard',
          name: 'admin-dashboard',
          label: 'Dashboard',
          icon: 'dashboard',
          component: AdminDashboard,
          displayInSidebar: true,
          meta: {'middleware': {auth: Auth}, 'layout': 'app' }
        },
        {
          path: '/admin/catalog',
          name: 'admin-catalog',
          label: 'Catalog',
          icon: 'dashboard',
          displayInSidebar: true,
          component: Catalog,
          meta: {'middleware': {auth: Auth}, 'layout': 'app' },
          children: [
              {
                path: 'product',
                component: ProductIndex,
                name: 'admin-product',
                label: 'Product',
                meta: {'middleware': {auth: Auth}, 'layout': 'app' },
              },
              {
                path: 'category',
                component: CategoryIndex,
                name: 'admin-category',
                label: 'Category',
                meta: {'middleware': {auth: Auth}, 'layout': 'app' },
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
