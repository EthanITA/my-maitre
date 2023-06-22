const routes = [
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
    ],
  },
];

export default routes;
