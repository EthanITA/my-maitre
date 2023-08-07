<template>
  <Button class="p-0" color="alternative" @click="showModal = true">
    <QRCodeModal v-model="showModal" :hall-location="location" :qr-codes="[]" />
    <div
      :href="HallLocation.getUrl((location as HallLocationItem).value)"
      class="px-2"
      target="_blank"
    >
      <p>{{ (location as HallLocationItem).name }}</p>
      <QRCodeVue3
        :cornersSquareOptions="{
          type: 'square',
        }"
        :dots-options="{
          type: 'square',
        }"
        :value="HallLocation.getUrl((location as HallLocationItem).value)"
        imgclass="mx-auto"
        myclass="flex"
      />
    </div>
  </Button>
</template>
<script lang="ts" setup>
import HallLocation, { HallLocationItem } from "../../models/HallLocation";
import QRCodeVue3 from "qrcode-vue3";
import { Button } from "flowbite-vue";
import QRCodeModal from "../Home/QRCodeModal.vue";
import { ref } from "vue";

const showModal = ref<boolean>(false);

defineProps<{
  location: HallLocationItem;
}>();
</script>

<style scoped></style>
