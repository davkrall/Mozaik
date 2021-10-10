import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Registration from '../views/Registration.vue'
import SignIn from '../views/SignIn.vue'
import SignIn2 from '../views/SignIn2.vue'
import Home from '../views/Home.vue'
import Favourites from '../views/Favourites.vue'
import Collection from '../views/Collection.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },

  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },

  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },

  {
    path: '/signin2',
    name: 'SignIn2',
    component: SignIn2
  },

  {
    path: '/home',
    name: 'Home',
    component: Home
  },

  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites
  },

  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },


  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
