import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import Registration from "../views/Registration.vue";
import SignIn from "../views/SignIn.vue";
import Home from "../views/Home.vue";
import Collection from "../views/Collection.vue";
import Account from "../views/Account.vue";
import GoogleAuth from "../views/GoogleAuth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },

  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },

  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },

  {
    path: "/home",
    name: "Home",
    component: Home,
  },

  {
    path: "/collection/:id",
    name: "Collection",
    component: Collection,
  },

  {
    path: "/account",
    name: "Account",
    component: Account,
  },

  {
    path: "/callback",
    name: "GoogleAuth",
    component: GoogleAuth,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
