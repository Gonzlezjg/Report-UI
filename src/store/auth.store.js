import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
  }),
  actions: {
    async login(email, password) {
      const config = {
        method: "post",
        url: "https://reports-rest.herokuapp.com/api/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
      };

      const { data } = await axios(config);

      this.user = data;
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data));

    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
