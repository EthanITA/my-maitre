<template>
  <Container
    :description="$t('menu.dishes.description')"
    :title="$t('menu.dishes.label', { name: (menu.name || '').toUpperCase() })"
    class="h-full overflow-y-hidden"
  >
    <Sheet class="grow overflow-y-hidden">
      <div class="flex gap-2 items-center h-full">
        <DraggableList
          :label="$t('menu.dishes.available')"
          class="h-full grow"
          v-model="left"
          group="dish"
        >
          <template #item="{ element: dishId }"
            >{{ dishes[dishId]?.name }}
          </template>
        </DraggableList>
        <div class="m-auto">
          <ArrowLongRightIcon class="h-8 w-8 text-gray-400" />
          <ArrowLongLeftIcon class="h-8 w-8 text-gray-400" />
        </div>
        <DraggableList
          :label="$t('menu.dishes.selected')"
          class="h-full grow"
          v-model="right"
          group="dish"
        >
          <template #item="{ element: dishId }"
            >{{ dishes[dishId]?.name }}
          </template>
        </DraggableList>
      </div>
      <template #footer>
        <Button
          :disabled="loading.submit"
          :loading="loading.submit"
          @click="submit"
          class="ml-auto"
          >{{ $t("menu.dishes.submit") }}</Button
        >
      </template>
    </Sheet>
  </Container>
</template>

<script lang="ts" setup>
import Container from "../Container.vue";
import Sheet from "../Sheet.vue";
import { onMounted, reactive, ref, watch } from "vue";
import Dish, { DishItem } from "../../models/Dish.ts";
import Menu, { MenuItem } from "../../models/Menu.ts";
import { Button } from "flowbite-vue";
import DraggableList from "../DraggableList.vue";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/24/solid";
import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  menuId: number;
}>();
const loading = reactive({
  submit: false,
});

const dishes = ref<Record<number, DishItem>>([]);
const menu = ref<MenuItem>({});

const left = ref<number[]>([]);
const right = ref<number[]>([]);
watch(right, () => {
  menu.value.dishes = right.value;
});

const submit = async () => {
  loading.submit = true;
  await new Menu(menu.value).update();
  loading.submit = false;
  await router.push("/menu");
};

onMounted(async () => {
  dishes.value = (await Dish.getAll()).reduce((acc, dish) => {
    acc[dish.id] = dish;
    return acc;
  }, {});
  menu.value = await Menu.get(props.menuId);
  right.value = menu.value.dishes;
  left.value = _.difference(Object.keys(dishes.value).map(Number), right.value);
});
</script>
<style scoped></style>
