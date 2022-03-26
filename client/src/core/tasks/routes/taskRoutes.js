const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "allTasks" */ "../ui/views/TasksPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../../../views/AboutView"),
  },
];
export default routes;
