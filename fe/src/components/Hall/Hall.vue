<template>
  <Container :title="$t('hall.label')">
    <template #action>
      <Button @click="$router.push('/hall/create')"
        >{{ $t("hall.create") }}
      </Button>
    </template>
    <div
      v-for="[hall, locations] in sortBy(
        Object.entries(halls),
        ([k, v]) => k.toLowerCase(),
        'asc'
      )"
      class="flex flex-col gap-2 ml-2"
    >
      <div class="flex justify-between mx-1">
        <h2 class="font-semibold text-gray-500 capitalize">{{ hall }}</h2>
        <div class="flex gap-1">
          <Button
            color="dark"
            outline
            pill
            size="xs"
            @click="
                () => {
                  ($refs.qrModal as any).setHall(hall);
                  showQRCodeModal = true;
                }
              "
          >
            <PlusIcon class="h-4 w-4" />
          </Button>
          <Button
            :disabled="!!locations.length"
            outline
            pill
            :ref="hall"
            size="xs"
            @click="$router.push(`/hall/edit/${hall}`)"
          >
            <PencilIcon class="h-4 w-4" />
          </Button>
          <Button
            :disabled="!!locations.length"
            color="red"
            outline
            :ref="hall"
            pill
            size="xs"
            @click="deleteHall(hall)"
          >
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

const deleteHall = async (hall: HallItem["name"]) => {
  await new Hall({ name: hall }).delete();
  delete halls.value[hall];
};

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
