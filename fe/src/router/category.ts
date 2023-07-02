const routes = [
  {
    path: "/category",
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
        component: () => import("../views/Category/CategoryCreationView.vue"),
      },
      {
        path: "edit/:id",
        name: "CategoryEdit",
        component: () => import("../views/Category/CategoryEditView.vue"),
      },
    ],
  },
];

export default routes;
