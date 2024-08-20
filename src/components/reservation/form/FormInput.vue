<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  type: {
    type: String,
    default: "text",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
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
    <input
      :id="props.id"
      :type="props.type"
      :name="props.id"
      :placeholder="props.label"
      :required="props.required"
      :disabled="props.disabled"
      :value="props.modelValue"
      @input="updateValue"
      class="px-6 py-3 w-full text-base font-medium text-gray-700 bg-white rounded-md border border-gray-300 outline-none dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 focus:shadow-md"
    />
  </div>
</template>
