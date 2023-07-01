<template>
  <div class="flex gap-1">
    <Badge
      v-for="day in modelValue"
      :key="day"
      class="justify-between !text-xs font-bold flex items-center gap-1 py-1 px-3"
      :class="{ 'pr-1': !disabled }"
    >
      <p>{{ new Date(day).toLocaleDateString() }}</p>
      <div
        v-if="!disabled"
        class="rounded-full p-0.5 cursor-pointer"
        @click="
          $emit(
            'update:modelValue',
            _.filter(modelValue, (d) => d !== day)
          )
        "
      >
        <XMarkIcon class="w-3 h-3 text-red-700" />
      </div>
    </Badge>
  </div>
</template>
<script lang="ts" setup>
import _ from "lodash";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { Badge } from "flowbite-vue";

defineProps<{
  modelValue: string[];
  disabled?: boolean;
  wrap?: boolean;
}>();

defineEmits<{
  (event: "update:modelValue", value: string[]): void;
}>();
</script>

<style scoped></style>
