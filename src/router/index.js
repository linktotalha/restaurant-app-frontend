import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dish from "@/Views/dish.vue";
import DishList from "@/Views/DishList.vue";
import DishDetail from "@/Views/DishDetail.vue";
// import Feedback from "@/views/Feedback.vue";
// import FeedbackList from "@/views/FeedbackList.vue";
// import FeedbackDetail from "@/views/FeedbackDetail.vue";

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
        },
        {
          path: "detail/:id",
          name: "dish-detail",
          component: DishDetail,
        },
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const user = localStorage.getItem("user");
//   if (to.meta.requiresAuth && !user) {
//     next({ name: "login" });
//   } 
//   else if (user  && (to.name == 'login' || to.name == 'register')) {
//     next({ name: "feedback-list" }); 
//   } 
//   else {
//     next();
//   }
// });
export default router;
