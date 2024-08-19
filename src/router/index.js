import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/reservation",
      name: "reservation",
      component: () => import("../views/ReservationView.vue"),
    },
    {
      path: "/booking",
      name: "booking",
      component: () =>
        import("../components/reservation/form/FormCreateProfile.vue"),
    },
  ],
});

export default router;
