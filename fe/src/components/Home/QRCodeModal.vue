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
                  <Input
                    :label="$t('menu.fields.menuType')"
                    :model-value="hall"
                    disabled
                  />
                  <Input
                    v-model="table"
                    :label="$t('order.fields.spot')"
                    placeholder="C34..."
                    @keyup.enter="createQrCode"
                  />
                </div>
                <div v-if="false" class="h-[300px] w-[300px] flex m-auto">
                  <ArrowPathIcon class="m-auto h-8 w-8 animate-spin" />
                </div>
                <div v-else-if="hallValue" class="truncate">
                  <QRCodeVue3
                    :cornersSquareOptions="{
                      type: 'square',
                    }"
                    :dots-options="{
                      type: 'square',
                    }"
                    :value="HallLocation.getUrl(hallValue)"
                    imgclass="mx-auto"
                    myclass="flex"
                  />

                  <a :href="hallValue" target="_blank">
                    {{ HallLocation.getUrl(hallValue) }}
                  </a>
                </div>
              </div>

              <div class="mt-4 float-right">
                <Button type="button" @click="createQrCode">
                  {{ $t("hall.qr_code.confirm") }}
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
import { Button, Input } from "flowbite-vue";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";
import { onMounted, ref, watch } from "vue";
import QRCodeVue3 from "qrcode-vue3";
import HallLocation from "../../models/HallLocation.ts";
import { debounce } from "lodash";

const hall = ref<string>("");
const table = ref<string>("");
const hallValue = ref<string>("");

const props = defineProps<{
  modelValue: boolean;
  qrCodes: string[];
}>();

const emits = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:qrCodes": [value: string[]];
}>();

defineExpose({
  setHall: (h: string) => {
    hall.value = h;
  },
});

const createQrCode = debounce(async () => {
  try {
    await new HallLocation({
      value: hallValue.value,
      hall_id: hall.value,
      name: table.value,
    }).create();
    emits("update:modelValue", false);
    emits("update:qrCodes", [...props.qrCodes, hallValue.value]);
  } catch (e) {
    console.log(e);
  }
}, 100);

const getLink = () => {
  const qrCodes = new Set(props.qrCodes);
  let attempts = 0;
  while (qrCodes.has(hallValue.value) && attempts < 1000) {
    hallValue.value = HallLocation.generateValue();
    attempts++;
  }
};
watch(hall, () => {
  getLink();
  table.value = "";
});
onMounted(getLink);
</script>
<style scoped></style>
