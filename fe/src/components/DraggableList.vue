<template>
  <div class="flex-col flex h-full">
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <draggable
      :model-value="modelValue"
      class="border-2 flex-col flex gap-2 p-2 rounded overflow-y-auto"
      itemKey="id"
      tag="div"
      v-bind="$attrs"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template #item="{ element, index }">
        <Button outline class="cursor-move">
          <slot :element="element" :index="index" name="item" />
        </Button>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts" setup>
import draggable from "vuedraggable";
import { Button } from "flowbite-vue";

defineProps<{
  modelValue: any[];
  label?: string;
}>();

defineEmits<{
  "update:modelValue": (value: any[]) => void;
}>();
</script>
<style scoped></style>
