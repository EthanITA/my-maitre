<template>
  <Container title="category.label">
    <form @submit.prevent="handleSubmit">
      <Sheet class="flex-col gap-4 flex">
        <template v-if="errorText" #header>
          <Alert type="danger">
            {{ $t(errorText) }}
          </Alert>
        </template>

        <div class="grid grid-cols-3 gap-2">
          <Input v-model="form.name" :label="$t('dish.fields.name')" />
          <Textarea
            v-model="form.description"
            :label="$t('dish.fields.description')"
            class="col-span-2"
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <Select
            :label="$t('dish.fields.category')"
            :model-value="form.category_id"
            :options="
              categories.map((category) => ({
                name: category.name,
                value: category.id,
              }))
            "
            @update:model-value="form.category_id = $event"
          />
          <div class="flex">
            <Input
              v-model="form.price"
              :label="$t('dish.fields.price')"
              class="grow rounded-r-none"
              type="number"
            />
            <Select
              :label="$t('dish.fields.unitOfMeasure')"
              :model-value="form.unit_of_measure_id"
              :options="
                unitOfMeasures.map((unitOfMeasure) => ({
                  name: $t(`dish.unitOfMeasure.${unitOfMeasure.measure}`),
                  value: unitOfMeasure.id,
                }))
              "
              @update:model-value="form.unit_of_measure_id = $event"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <div class="grow flex">
            <div class="m-auto">IMMAGINE (da fare)</div>
          </div>
          <ButtonSelect
            v-model="form.allergens_id"
            :label="$t('dish.fields.allergens')"
            :options="
              sortBy(
                allergens.map((allergen) => ({
                  name: $t(`dish.allergen.${allergen.name}`),
                  value: allergen.id,
                })),
                'name'
              )
            "
            vertical
            multiple
          />
          <ButtonSelect
            v-model="form.characteristics_id"
            :label="$t('dish.fields.characteristics')"
            :options="
              sortBy(
                characteristics.map((characteristic) => ({
                  name: $t(`dish.characteristic.${characteristic.name}`),
                  value: characteristic.id,
                })),
                'name'
              )
            "
            vertical
            multiple
          />
        </div>
        <template #footer>
          <Button class="ml-auto" type="submit">
            {{ $t("dish.creation.submit") }}
          </Button>
        </template>
      </Sheet>
    </form>
  </Container>
</template>
<script lang="ts" setup>
import Container from "../Container.vue";
import Sheet from "../Sheet.vue";
import { Alert, Button, Input, Select } from "flowbite-vue";
import { onMounted, reactive, ref } from "vue";
import Category, { CategoryItem } from "../../models/Category";
import { useRouter } from "vue-router";
import Dish, { DishItem } from "../../models/Dish.ts";
import Textarea from "../Textarea.vue";
import UnitOfMeasure, {
  UnitOfMeasureItem,
} from "../../models/UnitOfMeasure.ts";
import Allergen, { AllergenItem } from "../../models/Allergen.ts";
import Characteristic, {
  CharacteristicItem,
} from "../../models/Characteristic.ts";
import ButtonSelect from "../ButtonSelect.vue";
import { sortBy } from "lodash";

const router = useRouter();
const errorText = ref<string>("");

const categories = ref<CategoryItem[]>([]);
const unitOfMeasures = ref<UnitOfMeasureItem[]>([]);
const allergens = ref<AllergenItem[]>([]);
const characteristics = ref<CharacteristicItem[]>([]);

const props = defineProps<{
  form?: DishItem;
  isUpdating?: boolean;
  categoryId?: NonNullable<CategoryItem["id"]>;
}>();

const form = reactive<DishItem>({
  id: props.form?.id ?? 0,
  name: props.form?.name ?? "",
  image: props.form?.image ?? "",
  price: props.form?.price ?? 0,
  category_id: props.form?.category_id ?? props.categoryId ?? 0,
  description: props.form?.description ?? "",
  unit_of_measure_id: props.form?.unit_of_measure_id ?? 0,
  allergens_id: props.form?.allergens_id ?? [],
  characteristics_id: props.form?.characteristics_id ?? [],
});

const handleSubmit = async () => {
  errorText.value = "";
  const isValid = Dish.validate(form);
  if (!isValid) {
    errorText.value = "dish.creation.error";
    return;
  }
  const dish = new Dish(form);
  const f = props.isUpdating ? dish.update : dish.create;
  await f.bind(dish)();
  await router.push("/dish");
};

onMounted(async () => {
  categories.value = sortBy(await Category.getAll(), "name");
  unitOfMeasures.value = await UnitOfMeasure.getAll();
  allergens.value = await Allergen.getAll();
  characteristics.value = await Characteristic.getAll();

  form.category_id = form.category_id || categories.value[0].id || 0;
  form.unit_of_measure_id =
    form.unit_of_measure_id || unitOfMeasures.value[0].id || 0;
});
</script>

<style scoped></style>
