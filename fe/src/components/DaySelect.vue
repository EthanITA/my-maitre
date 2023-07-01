<template>
  <div>
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <div class="flex gap-0.5">
      <Button
        type="button"
        :color="color || 'default'"
        :outline="!isDaySelected(day)"
        @click="handleClick(day)"
        v-for="day in days"
        class="focus:!ring-0"
        pill
        square
      >
        <div class="h-5 w-5">
          {{ $t(`week.${day}`)[0] }}
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "flowbite-vue";
// @ts-ignore
import { ButtonVariant } from "flowbite-vue/dist_types/components/Button/types";
import { onMounted, ref } from "vue";
import { days, Weekday } from "../models/Custom/DatetimeTypes.ts";

const props = defineProps<{
  modelValue?: Weekday | Weekday[];
  label?: string;
  color?: ButtonVariant;
  multiple?: boolean;
}>();

const dayRefs = ref<Button | null>([]);

const emit = defineEmits<{
  (event: "update:modelValue", value: Weekday | Weekday[]): void;
}>();

const isDaySelected = (day: Weekday) => {
  if (props.multiple) {
    return (props.modelValue as Weekday[]).includes(day);
  }
  return props.modelValue === day;
};

const handleClick = (day: Weekday) => {
  if (props.multiple) {
    const days = props.modelValue as Weekday[];
    if (days.includes(day)) {
      emit(
        "update:modelValue",
        days.filter((d) => d !== day)
      );
    } else {
      emit("update:modelValue", [...days, day]);
    }
    days.forEach((d) => {
      if (dayRefs.value[d][0]) {
        dayRefs.value[d][0].focus(isDaySelected(d));
      }
    });
  } else {
    emit("update:modelValue", day);
  }
};
onMounted(() => {
  for (let i = 0; i < 7; i++) {
    dayRefs.value[i] = ref(null);
  }
});
</script>

<style scoped></style>
