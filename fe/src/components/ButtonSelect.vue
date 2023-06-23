<script setup lang="ts">
import { Button, ButtonGroup } from "flowbite-vue";

type Option = {
  name: string;
  value: any;
};

defineProps<{
  options: Option[];
  modelValue?: Option["value"];
  label?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <div>
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
    <ButtonGroup class="shadow-none">
      <Button
        :disabled="disabled || false"
        :outline="
          JSON.stringify(option.value) !== JSON.stringify(modelValue || '')
        "
        v-for="option in options"
        class="rounded-none focus:!ring-2 first:rounded-l last:rounded-r border-r-0 last:border-r-[1px]"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.name }}
      </Button>
    </ButtonGroup>
  </div>
</template>

<style scoped></style>
