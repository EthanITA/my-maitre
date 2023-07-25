const routes = [
  {
    path: "/order",
    name: "Order",
    children: [
      {
        path: "",
        name: "OrderList",
        component: () => import("../views/Order/OrderView.vue"),
      },
    ],
  },
];

export default routes;
