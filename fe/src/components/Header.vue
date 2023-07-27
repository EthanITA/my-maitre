<template>
  <div class="flex items-center justify-between px-4">
    <div></div>
    <div class="flex items-center gap-4">
      <Button
        @click="showQrCodeModal = true"
        class="border-0"
        color="alternative"
        pill
        square
      >
        <QrCodeIcon class="h-8 w-8 text-gray-500" />
      </Button>
      <div class="ml-auto">PROFILO</div>
    </div>
    <QRCodeModal v-if="showQrCodeModal" v-model="showQrCodeModal" />
  </div>
</template>
<script lang="ts" setup>
import { QrCodeIcon } from "@heroicons/vue/24/solid";
import { Button } from "flowbite-vue";
import { ref } from "vue";
import QRCodeModal from "./Home/QRCodeModal.vue";

const showQrCodeModal = ref<boolean>(false);
</script>

<style scoped></style>
