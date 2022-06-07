/* eslint-disable */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import CartView from "../views/CartView.vue";
import CartDetailsView from "../views/CartDetailsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";
import { projectAuth } from "../firebase/config";

const requireUser = (_to, _from, next) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "SignUpView" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    beforeEnter: requireUser,
  },
  {
    path: "/signup",
    name: "SignUpView",
    component: SignUpView,
  },
  {
    path: "/cartitems",
    name: "cartitems",
    component: CartView,
    beforeEnter: requireUser,
  },
  {
    path: "/cartitems/:id",
    name: "cartitemDetails",
    component: CartDetailsView,
    beforeEnter: requireUser,
  },
  {
    path: "/addcartview",
    name: "addcartview",
    component: () => import("../views/AddCartView.vue"),
  },
  {
    path: "/",
    redirect: "signup",
  },
  {
    path: "/:catchAll(.*)",
    name: "pagenotfound",
    component: PageNotFoundView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
