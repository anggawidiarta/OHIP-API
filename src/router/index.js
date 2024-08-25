import ReservationHomeView from "../views/reservation/ReservationHomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "reservation-home",
      component: ReservationHomeView,
    },
    {
      path: "/ohip-api-test",
      name: "ohip-api-test",
      component: () => import("../views/home/HomeView.vue"),
    },
    {
      path: "/reservation-before",
      name: "booking",
      component: () => import("../views/reservation/ReservationView.vue"),
    },
  ],
});

export default router;
