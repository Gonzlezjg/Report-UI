<script setup>
import { ref } from "vue";
import LogoVue from "../components/Logo.vue";

const username = ref("");
const password = ref("");
const email = ref("");

const register = (e) => {
  e.preventDefault();
  const rol = "USER";
  console.log(username.value, password.value, email.value);
};
</script>

<template>
  <section class="w-full flex flex-col justify-center items-center mx-auto">
    <LogoVue />
    <h1 class="text-3xl font-bold text-sky-500 text-center mb-2">
      Registro de usuarios
    </h1>
    <div class="w-full max-w-xs">
      <form class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-500 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-500 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Correo electronico"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-500 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            v-model.number="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-center">
          <button
            @click="register"
            class="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear usuario
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100vw;
}
</style>
