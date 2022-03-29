const routes = [
  {
    path: "/to-do",
    name: "allTasks",
    component: () =>
      import(/* webpackChunkName: "allTasks" */ "../ui/views/TasksPage"),
    children: [
      {
        path: ":id",
        name: "oneTask",
        props: () => ({}),
        component: () =>
          import(/* webpackChunkName: "oneTask" */ "../ui/views/TaskPage.vue"),
      },
    ],
  },
];
export default routes;
