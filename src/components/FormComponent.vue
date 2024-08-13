<script setup>
import { useApisStore } from "@/stores/api";

const store = useApisStore();

const props = defineProps({
  formClass: String,
  buttonClass: String,
  buttonText: String,
  errorMessage: String,
  successMessage: String,
});

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  emit("submit");
};
</script>

<template>
  <form @submit.prevent="handleSubmit" :class="props.formClass">
    <slot></slot>
    <button :disabled="!store.token" :class="props.buttonClass">
      {{ props.buttonText }}
    </button>
    <p
      v-if="props.errorMessage"
      class="col-span-full capitalize font-bold text-red-500 text-end"
    >
      {{ props.errorMessage }}
    </p>
    <p
      v-if="props.successMessage"
      class="col-span-full text-xl capitalize font-bold text-green-500 text-end"
    >
      {{ props.successMessage }}
    </p>
  </form>
</template>
