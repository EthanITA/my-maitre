import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import menu from "./menu";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  ...menu,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
