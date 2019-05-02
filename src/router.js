import Vue from 'vue'
import Router from 'vue-router'
import AdminDashboard from './views/AdminDashboard.vue'
import Guest from './middleware/guest';
import Auth from './middleware/auth';
import isNil from 'lodash/isNil';

Vue.use(Router)
let router = new Router({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: [
        { path: '/', redirect: '/admin/dashboard' },
        {
          path: '/admin/dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard,
          meta: {'middleware': {auth: Auth}, 'layout': 'app' }
        },
        {
          path: '/admin/login',
          name: 'admin-login',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
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
