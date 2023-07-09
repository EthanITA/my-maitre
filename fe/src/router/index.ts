import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import menu from "./menu";
import category from "./category";
import dish from "./dish.ts";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  ...menu,
  ...category,
  ...dish,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
