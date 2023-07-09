<script lang="ts" setup>
import { Button, ButtonGroup } from "flowbite-vue";
// @ts-ignore
import { ButtonVariant } from "flowbite-vue/dist_types/components/Button/types";

type Option = {
  name: string;
  value: any;
};

const props = defineProps<{
  options: Option[];
  modelValue?: Option["value"] | Option["value"][];
  label?: string;
  disabled?: boolean;
  vertical?: boolean;
  color?: ButtonVariant;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": (value: Option["value"] | Option["value"][]) => void;
}>();

const isSelected = (option: Option): boolean => {
  if (props.multiple) {
    return !!(props.modelValue as Option["value"][]).find(
      (value) => JSON.stringify(value) === JSON.stringify(option.value)
    );
  } else {
    return (
      JSON.stringify(option.value) === JSON.stringify(props.modelValue || "")
    );
  }
};

const emitUpdate = (value: Option["value"] | Option["value"][]): void => {
  if (props.multiple) {
    emit("update:modelValue", [
      ...(props.modelValue as Option["value"][]).filter(
        (v) => JSON.stringify(v) !== JSON.stringify(value)
      ),
      value,
    ]);
  } else {
    emit("update:modelValue", value);
  }
};
</script>
<template>
  <div>
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
    <ButtonGroup :class="{ 'flex-col': vertical }" class="shadow-none">
      <Button
        v-for="option in options"
        :class="{
          'first:rounded-l last:rounded-r border-r-0 last:border-r-[1px]':
            !vertical,
          'first:rounded-t last:rounded-b border-b-0 last:border-b-[1px]':
            vertical,
        }"
        :color="color || 'default'"
        :disabled="disabled || false"
        :outline="!isSelected(option)"
        class="rounded-none focus:!ring-0"
        type="button"
        @click="emitUpdate(option.value)"
      >
        {{ option.name }}
      </Button>
    </ButtonGroup>
  </div>
</template>

<style scoped></style>
