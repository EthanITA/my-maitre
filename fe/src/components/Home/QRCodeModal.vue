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
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ $t("order.qr_code.title") }}
              </DialogTitle>
              <div class="mt-2 gap-4 flex text-center flex-col">
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
                <div v-if="loading" class="h-[300px] w-[300px] flex m-auto">
                  <ArrowPathIcon class="m-auto h-8 w-8 animate-spin" />
                </div>
                <div v-else-if="qrcodeValue" class="truncate">
                  <QRCodeVue3
                    myclass="flex"
                    :dots-options="{
                      type: 'square',
                    }"
                    :cornersSquareOptions="{
                      type: 'square',
                    }"
                    imgclass="mx-auto"
                    :value="qrcodeValue"
                  />

                  <a
                    href="https://www.npmjs.com/package/qrcode-vue3"
                    target="_blank"
                  >
                    {{ qrcodeValue }}
                  </a>
                </div>
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
import { ArrowPathIcon } from "@heroicons/vue/24/solid";
import { ref, watch } from "vue";
import QRCodeVue3 from "qrcode-vue3";
import { menuTypes } from "../../models/Menu";
import Order from "../../models/Order";
import { debounce } from "lodash";

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const menuType = ref<(typeof menuTypes)[number]>(menuTypes[0]);
const table = ref<string>("");
const loading = ref<boolean>(false);

// @ts-ignore
const url: string = import.meta.env.VITE_API_URL;

const qrcodeValue = ref<string>("");
const getLink = debounce(async () => {
  const encodedTable = await Order.getTableLink({
    spot: table.value,
    menuType: menuType.value,
  });
  qrcodeValue.value = `${url}/customer/${encodedTable.data}`;
  loading.value = false;
}, 500);

watch([menuType, table], () => {
  loading.value = false;
  if (!menuType.value || !table.value.trim()) {
    qrcodeValue.value = "";
    return;
  }
  loading.value = true;
  getLink();
});
</script>
<style scoped></style>
