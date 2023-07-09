const routes = [
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
    ],
  },
];

export default routes;
