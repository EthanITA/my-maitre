<script lang="ts" setup>
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between">
      <div>
        <slot v-if="$slots.header" name="header" />
        <template v-else>
          <p v-if="title" class="font-semibold text-xl">
            {{ $t(title) }}
          </p>
          <p v-if="description">
            {{ $t(description) }}
          </p>
        </template>
      </div>
      <div
        v-if="$slots.action"
        class="ml-16 flex items-center gap-2 whitespace-nowrap"
      >
        <slot name="action" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
