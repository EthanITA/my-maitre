<template>
  <Container description="menu.description" title="menu.label">
    <template #action>
      <Button @click="$router.push('/menu/create')"
        >{{ $t("menu.add") }}
      </Button>
    </template>
    <Table
      :clickRow="({ id }: MenuItem) => $router.push(`/menu/edit/${id}/dishes`)"
      :data="menus"
      :headers="['name', 'dishes', 'openHours', 'visibility']"
      :rowDisabled="({ enabled }) => !enabled"
      prefix="menu.fields"
    >
      <template #price="{ value }">
        {{ value.price }}
      </template>
      <template #dishes="{ value }">
        <p class="font-semibold">{{ value.dishes.length }}</p>
      </template>
      <template #openHours="{ value: { open_hours } }">
        <p class="font-semibold">
          {{ open_hours.start }} - {{ open_hours.end }}
        </p>
      </template>
      <template
        #visibility="{
          value: {
            visibility: { type, availability },
          },
        }"
      >
        <div class="w-full overflow-x-auto">
          <div
            v-if="type as MenuItem['visibility']['type'] === 'everyday'"
            class="font-bold"
          >
            <p>{{ $t("menu.visibilities.everyday") }}</p>
          </div>
          <DaySelect
            v-else-if="type as MenuItem['visibility']['type'] === 'weekdays'"
            :model-value="availability as Weekday[]"
            multiple
          />
          <div v-else-if="type as MenuItem['visibility']['type'] === 'days'">
            <DaysList :model-value="availability as string[]" disabled />
          </div>
        </div>
      </template>
      <template #actions="{ value }">
        <Button
          outline
          pill
          square
          @click="$router.push(`/menu/edit/${value.id}`)"
        >
          <PencilIcon class="h-4 w-4" />
        </Button>
        <Button
          :disabled="value.loading"
          :loading="value.loading"
          color="red"
          outline
          pill
          square
          @click="deleteMenu(value)"
        >
          <TrashIcon class="h-4 w-4" />
        </Button>
      </template>
    </Table>
  </Container>
</template>
<script lang="ts" setup>
import { Button } from "flowbite-vue";
import { onMounted, ref } from "vue";
import Table from "../Table.vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import Container from "../Container.vue";
import Menu, { MenuItem } from "../../models/Menu.ts";
import DaySelect from "../DaySelect.vue";
import { Weekday } from "../../models/Custom/DatetimeTypes.ts";
import _ from "lodash";
import DaysList from "../DaysList.vue";
// @ts-ignore
const menus = ref<MenuItem[]>([]);

const getMenus = async () => {
  menus.value = _.sortBy(await Menu.getAll(), [
    (menu) => !menu.enabled,
    "name",
  ]);
};

const deleteMenu = (
  menu: MenuItem & {
    loading?: boolean;
  }
) => {
  menu.loading = true;
  new Menu(menu)
    .delete()
    .then(() => (menus.value = menus.value.filter((m) => m.id !== menu.id)))
    .finally(getMenus);
};

onMounted(getMenus);
</script>
<style scoped></style>
