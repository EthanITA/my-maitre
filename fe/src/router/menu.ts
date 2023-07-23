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
        name: "MenuEditIndex",
        children: [
          {
            path: "",
            name: "MenuEdit",
            component: () => import("../views/Menu/MenuEditView.vue"),
          },
          {
            path: "dishes",
            name: "MenuDishList",
            component: () => import("../views/Menu/MenuDishListView.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
