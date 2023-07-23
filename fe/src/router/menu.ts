import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/menu",
    name: "Menu",
    children: [
      {
        path: "",
        name: "MenuList",
        component: () => import("../views/Menu/MenuView.vue"),
      },
      {
        path: "create",
        name: "CreateMenu",
        component: () => import("../views/Menu/MenuCreationView.vue"),
      },
      {
        path: "edit/:id",
        name: "MenuEdit",
        component: () => import("../views/Menu/MenuEditView.vue"),
      },
    ],
  },
];

export default routes;
