<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import { useRepotsStore } from "../store/user.store";
import { useAuthStore } from "../store/auth.store";
import * as Yup from "yup";
import Spin from "./icons/Spin.vue";

const useReports = useRepotsStore();
const userStore = useAuthStore();
const { uid } = userStore.user.user;

const feedBack = ref(useReports.feedBack)

const props = defineProps({
  show: Boolean,
});

const schema = Yup.object().shape({
  titulo: Yup.string().required("titulo es requerido"),
  descripcion: Yup.string().required("descripcion es requerido"),
});

function onSubmit(values, { setErrors }) {
  useReports.addReport(values, uid).then(() => {
    setErrors({});
  });
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container bg-slate-800 rounded">
          <div class="text-slate-400 text-center font-bold capitalize">
            <slot name="header">default header</slot>
          </div>
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors, isSubmitting }"
          >
            <div class="modal-body text-slate-100">
              <Field
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-1 focus:shadow-outline"
                name="titulo"
                id="titulo"
                type="text"
                placeholder="Titulo del nuevo reporte"
                :class="{ 'is-invalid': errors.titulo }"
              />
              <Field
                class="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-1 focus:shadow-outline"
                name="descripcion"
                id="descripcion"
                type="text"
                placeholder="Descripcion del nuevo reporte"
              />
              <span>{{feedBack}}</span>
            </div>

            <div class="modal-footer text-slate-100">
              <slot name="footer">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  <Spin v-show="isSubmitting" class="animate-spin" />
                  Crear
                </button>
                <button
                  class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  @click="$emit('close')"
                >
                  Cerrar
                </button>
              </slot>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #121212;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  color: white;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
