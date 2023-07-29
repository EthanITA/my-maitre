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
    ],
  },
];

export default routes;
