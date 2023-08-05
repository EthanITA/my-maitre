<template>
  <Button color="alternative" class="p-0">
    <a class="px-2" :href="HallLocation.getUrl(location.value)" target="_blank">
      <p>{{ location.name }}</p>
      <QRCodeVue3
        :cornersSquareOptions="{
          type: 'square',
        }"
        :dots-options="{
          type: 'square',
        }"
        :value="HallLocation.getUrl(location.value)"
        imgclass="mx-auto"
        myclass="flex"
      />
    </a>
  </Button>
</template>
<script lang="ts" setup>
import HallLocation, { HallLocationItem } from "../../models/HallLocation";
import QRCodeVue3 from "qrcode-vue3";
import { Button } from "flowbite-vue";

defineProps<{
  location: HallLocationItem;
}>();
</script>

<style scoped></style>
