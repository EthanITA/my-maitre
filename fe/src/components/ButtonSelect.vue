<script setup lang="ts">
import { Button, ButtonGroup } from "flowbite-vue";
// @ts-ignore
import { ButtonVariant } from "flowbite-vue/dist_types/components/Button/types";

type Option = {
  name: string;
  value: any;
};

defineProps<{
  options: Option[];
  modelValue?: Option["value"];
  label?: string;
  disabled?: boolean;
  vertical?: boolean;
  color?: ButtonVariant;
}>();
</script>
<template>
  <div>
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
    <ButtonGroup class="shadow-none" :class="{ 'flex-col': vertical }">
      <Button
        :color="color || 'default'"
        :disabled="disabled || false"
        :outline="
          JSON.stringify(option.value) !== JSON.stringify(modelValue || '')
        "
        v-for="option in options"
        class="rounded-none focus:!ring-0"
        :class="{
          'first:rounded-l last:rounded-r border-r-0 last:border-r-[1px]':
            !vertical,
          'first:rounded-t last:rounded-b border-b-0 last:border-b-[1px]':
            vertical,
        }"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.name }}
      </Button>
    </ButtonGroup>
  </div>
</template>

<style scoped></style>
