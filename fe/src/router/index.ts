import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import menu from "./menu";
import dish from "./dish.ts";
import order from "./order.ts";
import hall from "./hall.ts";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  ...menu,
  ...dish,
  ...order,
  ...hall,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
