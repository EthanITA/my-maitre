<template>
  <Container :title="$t('hall.label')">
    <div
      v-for="[hall, locations] in sortBy(
        Object.entries(halls),
        ([k, v]) => k.toLowerCase(),
        'asc'
      )"
      class="flex flex-col gap-2 ml-2"
    >
      <div class="flex justify-between mx-1">
        <h2 class="font-semibold text-gray-500">{{ hall }}</h2>
        <div class="flex gap-1">
          <Button color="dark" outline pill size="xs">
            <PlusIcon
              class="h-4 w-4"
              @click="
                () => {
                  $refs.qrModal.setHall(hall);
                  showQRCodeModal = true;
                }
              "
            />
          </Button>
          <Button outline pill size="xs">
            <PencilIcon class="h-4 w-4" />
          </Button>
          <Button color="red" outline pill size="xs">
            <TrashIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        class="grid md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 grid-cols-4 gap-2"
      >
        <HallTable v-for="location in locations" :location="location" />
      </div>
    </div>
    <QRCodeModal
      ref="qrModal"
      v-model="showQRCodeModal"
      :qrCodes="
        Object.values(halls)
          .flat(1)
          .map((hall) => hall.value)
      "
    />
  </Container>
</template>
<script lang="ts" setup>
import Container from "../Container.vue";
import Hall, { HallItem } from "../../models/Hall.ts";
import { onMounted, ref } from "vue";
import HallLocation, { HallLocationItem } from "../../models/HallLocation.ts";
import { sortBy } from "lodash";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { Button } from "flowbite-vue";
import QRCodeModal from "../Home/QRCodeModal.vue";
import HallTable from "./HallTable.vue";

const halls = ref<Record<HallItem["name"], HallLocationItem[]>>({});
const showQRCodeModal = ref<boolean>(false);
onMounted(async () => {
  const hallLocations: HallLocationItem[] = await HallLocation.getAll();
  halls.value = (await Hall.getAll()).reduce((acc, hall) => {
    acc[hall.name] = [];
    return acc;
  }, {} as Record<HallItem["name"], HallLocationItem[]>);
  hallLocations.forEach((hallLocation) => {
    halls.value[hallLocation.hall_id].push(hallLocation);
  });
});
</script>
<style scoped></style>
