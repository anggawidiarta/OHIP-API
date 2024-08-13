<script setup>
import { JsonViewer } from "vue3-json-viewer";

const props = defineProps({
  data: Object,
});
</script>

<template>
  <div v-if="props.data" class="px-5 py-3">
    <JsonViewer
      :value="props.data"
      copyable
      expandable
      boxed
      sort
      theme="jv-dark"
    />
  </div>
</template>
