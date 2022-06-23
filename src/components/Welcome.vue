<script setup>
defineProps({
  userName: String,
  logout: Function,
});
</script>
<template>
  <header
    class="text-center rounded-md bg-slate-700 flex justify-between my-2 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6"
  >
    <h1 class="text-lg font-bold text-slate-100">
      Bienvenido, {{ userName.toUpperCase() }}
    </h1>
    <button
      @click="logout"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Salir
    </button>
  </header>
</template>
