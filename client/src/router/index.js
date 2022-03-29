import Vue from "vue";
import VueRouter from "vue-router";

import taskRoutes from "../core/tasks/routes/taskRoutes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/to-do",
    name: "settings2",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
  },
  {
    path: "*",
    name: "error",
    meta: { layout: "error" },
  },
  ...taskRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    let position = { x: 0, y: 0 };
    if (savedPosition) {
      position = savedPosition;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(position);
      }, 300);
    });
  },
  routes,
});

export default router;
