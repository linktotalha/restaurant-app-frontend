import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dish from "@/Views/dish.vue";
import DishList from "@/Views/DishList.vue";
import DishDetail from "@/Views/DishDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/dish",
      children: [
        {
          path: "",
          name: "dish",
          component: Dish,
          meta: { requiresAuth: true }
        },
        {
          path: "list",
          name: "dish-list",
          component: DishList,
          meta: { requiresAuth: true }
        },
        {
          path: "detail/:id",
          name: "dish-detail",
          component: DishDetail,
          meta: { requiresAuth: true }
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");
  if (to.meta.requiresAuth && !user) {
    next({ name: "login" });
  }
  else {
    next();
  }
});
export default router;
