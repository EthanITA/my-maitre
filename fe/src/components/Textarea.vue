<template>
  <div>
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <textarea
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      rows="4"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
    ></textarea>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  modelValue?: string;
}>();

defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
