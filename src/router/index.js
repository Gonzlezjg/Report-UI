import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth.store";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/home/:userName",
    name: "Home",
    component: Home,
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const auth = useAuthStore();
  if (auth.user && to.name === "Login") {
    return { path: `/home/${auth.user.user.user_name}` };
  }
});

export default router;
