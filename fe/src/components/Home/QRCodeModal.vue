<template>
  <TransitionRoot :show="modelValue" appear as="template">
    <Dialog
      as="div"
      class="relative z-9999"
      @close="$emit('update:modelValue', false)"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ $t("order.qr_code.title") }}
              </DialogTitle>
              <div class="mt-2 gap-2 grid">
                <div class="grid grid-cols-2 gap-4">
                  <Select
                    v-model="menuType"
                    :label="$t('menu.fields.menuType')"
                    :options="
                      menuTypes.map((type) => ({
                        value: type,
                        name: $t(`menu.types.${type}`),
                      }))
                    "
                  />
                  <Input
                    v-model="table"
                    :label="$t('order.fields.spot')"
                    placeholder="C34"
                  />
                </div>

                <QRCodeVue3 value="Simple QR code" />
              </div>

              <div class="mt-4 float-right">
                <Button
                  type="button"
                  @click="$emit('update:modelValue', false)"
                >
                  {{ $t("order.qr_code.close") }}
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Button, Input, Select } from "flowbite-vue";
import { computed, ref } from "vue";

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const menuTypes = [
  "standard",
  "lunch",
  "dinner",
  "roomService",
  "umbrella",
] as const;

const menuType = ref<string>(menuTypes[0]);
const table = ref<string>("");

// @ts-ignore
const url: string = import.meta.env.VITE_API_URL;

const qrcodeValue = computed(() => {
  return `${url}/menu/${menuType.value}/${table.value}`;
});
</script>
<style scoped></style>
