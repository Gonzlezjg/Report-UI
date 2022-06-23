<script setup>
import Logo from "../components/Logo.vue";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useAuthStore } from "../store/auth.store";
import Spin from "../components/icons/Spin.vue";

const schema = Yup.object().shape({
  email: Yup.string().required("Email es requerido"),
  password: Yup.string().required("Password es requerido"),
});

function onSubmit(values, { setErrors }) {
  const authStore = useAuthStore();
  const { email, password } = values;

  return authStore
    .login(email, password)
    .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
  <section class="flex flex-col justify-center items-center mx-auto">
    <Logo />
    <h1 class="text-3xl font-bold text-sky-500 text-center mb-2">
      Reports App
    </h1>
    <div class="w-full max-w-xs">
      <Form
        class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="mb-4">
          <label class="block text-gray-500 text-sm font-bold mb-2" for="email">
            email
          </label>
          <Field
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-1 focus:shadow-outline"
            name="email"
            id="email"
            type="text"
            placeholder="correo@correo.com"
            :class="{ 'is-invalid': errors.email }"
          />
          <p class="text-red-500 text-xs italic">{{ errors.email }}</p>
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-500 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <Field
            :class="{ 'is-invalid': errors.password }"
            name="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-1 focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p class="text-red-500 text-xs italic">{{ errors.password }}</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex"
            type="submit"
          >
            <Spin v-show="isSubmitting" class="animate-spin" />

            Entrar
          </button>
          <router-link to="/signup">
            <button
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Registrar usuario
            </button>
          </router-link>
        </div>
      </Form>
      <p class="text-center text-gray-500 text-xs">&copy;2022 Jose Puerta</p>
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100vw;
}
</style>
