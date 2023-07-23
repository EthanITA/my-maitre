import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/dish",
    name: "Dish",
    children: [
      {
        path: "",
        name: "DishList",
        component: () => import("../views/Dish/DishView.vue"),
      },
      {
        path: "create",
        name: "CreateDish",
        component: () => import("../views/Dish/DishCreationView.vue"),
      },
      {
        path: "edit/:id",
        name: "DishEdit",
        component: () => import("../views/Dish/DishEditView.vue"),
      },
      {
        path: "category",
        name: "Category",
        children: [
          {
            path: "",
            name: "CategoryList",
            component: () => import("../views/Category/CategoryView.vue"),
          },
          {
            path: "create",
            name: "CreateCategory",
            component: () =>
              import("../views/Category/CategoryCreationView.vue"),
          },
          {
            path: "edit/:id",
            name: "CategoryEdit",
            component: () => import("../views/Category/CategoryEditView.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
