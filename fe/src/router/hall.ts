const routes = [
  {
    path: "/hall",
    name: "Hall",
    children: [
      {
        path: "",
        name: "HallList",
        component: () => import("../views/Hall/HallView.vue"),
      },
      {
        path: "create",
        name: "HallCreate",
        component: () => import("../views/Hall/HallCreateView.vue"),
      },
    ],
  },
];

export default routes;
