import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestHome from "@/views/TestHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TestHome,
    },
    {
      path: "/reservation",
      name: "reservation",

      component: () => import("../views/ReservationView.vue"),
    },
    {
      path: "/booking",
      name: "booking",
      component: () => import("../views/BookingForm.vue"),
    },
  ],
});

export default router;
