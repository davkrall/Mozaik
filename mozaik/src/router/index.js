import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Registration from '../views/Registration.vue'
import SignIn from '../views/SignIn.vue'
import SignIn2 from '../views/SignIn2.vue'
import Home from '../views/Home.vue'
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
    path: '/collection/:id',
    name: 'Collection',
    component: Collection
  },
]

const router = new VueRouter({
  routes
})

export default router
