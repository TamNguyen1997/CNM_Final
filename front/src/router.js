import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/user/Home.vue'
import Login from './views/Login.vue'
import Admin from './views/admin/Admin.vue'
import Adduser from './views/admin/AddUser.vue'
import Addaccount from './views/admin/AddAccount.vue'
import Recharge from './views/admin/Recharge.vue'
import Accounts from './views/user/Accounts.vue'
import Transfer from './views/user/Transfer.vue'
import Transactions from './views/user/Transactions.vue'
import SettingFavReceiver from './views/user/SettingFavReceiver.vue'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);

        if(user.roles === 'admin') {
          return next('/admin');
        }
        next();
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    //============page for admin role==============
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        checkAuthorized(to, from, next);
      }
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: Adduser,
      beforeEnter: (to, from, next) => {
        checkAuthorized(to, from, next);
      }
    },
    {
      path: '/addaccount',
      name: 'addaccount',
      component: Addaccount,
      beforeEnter: (to, from, next) => {
        checkAuthorized(to, from, next);
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge,
      beforeEnter: (to, from, next) => {
        checkAuthorized(to, from, next);
      }
    },
    //============page for user role==============
    {
      path: '/accounts',
      name: 'account',
      component: Accounts
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    {
      path: '/setreceiver',
      name: 'setreceiver',
      component: SettingFavReceiver
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transactions
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

//helper function 
function checkAuthorized(to, from, next) {
  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  if(user.type !== 'admin') {
    return next(false);
  }
  next();
}