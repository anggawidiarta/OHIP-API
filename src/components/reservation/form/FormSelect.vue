<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  options: Array,
  placeholder: {
    type: String,
    default: "Select an option",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="mb-5">
    <label
      :for="id"
      class="block mb-3 text-base font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <select
      :id="props.id"
      :name="props.id"
      :required="props.required"
      :value="props.modelValue"
      @input="updateValue"
      class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
    >
      <option value="" disabled>{{ props.placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
