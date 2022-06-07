import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import CartView from "../views/CartView.vue";
import CartDetailsView from "../views/CartDetailsView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
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
  },
  {
    path: "/cartitems/:id",
    name: "cartitemDetails",
    component: CartDetailsView,
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
