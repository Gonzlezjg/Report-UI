<script setup>
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth.store";
import { useRepotsStore } from "../store/user.store";
import Edit from "../components/icons/Edit.vue";
import Detele from "../components/icons/Detele.vue";
import Welcome from "../components/Welcome.vue";
import NewReportModal from "../components/NewReportModal.vue";

const authStore = useAuthStore();
const userStore = useRepotsStore();

watchEffect(async () => {
  await userStore.getReports();
});

function formatDate(v) {
  return v.replace(/T|Z/g, " ");
}
const { user: authUser } = storeToRefs(authStore);
const { value } = authUser;

const { allReport } = userStore.reports;
 
const reports = ref(allReport);
const showModal = ref(false);
</script>

<template>
  <div class="px-40">
    <Welcome :user-name="value?.user.user_name" :logout="authStore.logout" />
    <section>
      <div class="dashboard bg-slate-800 rounded-md">
        <header
          class="bg-slate-700 space-y-4 rounded-md p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6"
        >
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-white">Mis reportes</h2>
            <button
              id="show-modal"
              @click="showModal = true"
              class="hover:bg-green-400 group flex items-center rounded-md bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="mr-2"
                aria-hidden="true"
              >
                <path
                  d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"
                />
              </svg>
              Nuevo
            </button>
          </div>
        </header>
        <ul
          class="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-4 gap-4 text-sm leading-6"
        >
          <li
            v-for="(report, index) in reports"
            :key="index"
            class="bg-slate-700 rounded shadow-md flex justify-center px-6 py-4 text-slate-100"
          >
            <div>
              <h6 class="font-bold">{{ report.name }}</h6>
              <p class="my-2">{{ report.message }}</p>
              <div>
                <span class="font-bold">{{ report.user.user_name }}</span> -
                <span>{{ formatDate(report.createdAt) }}</span>
              </div>
            </div>
            <div class="h-full ml-3">
              <a
                href="/report/1"
                class="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm mb-1 h-2/4"
              >
                <Edit class="mx-1" />
                Editar
              </a>
              <a
                href="/report/1"
                class="hover:bg-red-400 group flex items-center rounded-md bg-red-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm h-2/4"
              >
                <Detele class="mx-1" />
                Eliminar
              </a>
            </div>
          </li>
        </ul>
      </div>
      <NewReportModal :show="showModal" @close="showModal = false">
        <template #header>
          <h3>Nuevo reporte</h3>
        </template>
      </NewReportModal>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
