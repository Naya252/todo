const routes = [
  {
    path: "/",
    name: "allTasks",
    component: () =>
      import(/* webpackChunkName: "allTasks" */ "../ui/views/TasksPage"),
  },
];
export default routes;
