<template>
  <Container title="dish.label">
    <template #action v-if="isUpdating">
      <input
        ref="fileInput"
        accept="image/*"
        class="hidden"
        type="file"
        @change="uploadImage"
      />
      <Button
        @click="$refs.fileInput.click()"
        :loading="loading.uploadImage"
        :disabled="loading.uploadImage"
      >
        {{ $t("dish.uploadImage") }}
      </Button>
      <Button
        v-if="imgUrl"
        @click="deleteImage"
        :loading="loading.deleteImage"
        :disabled="loading.deleteImage"
        outline
        color="red"
      >
        {{ $t("dish.deleteImage") }}
      </Button>
    </template>
    <form @submit.prevent="handleSubmit">
      <Sheet class="flex-col gap-4 flex">
        <template #header v-if="errorText || imgUrl">
          <div class="grid gap-2">
            <Alert v-if="errorText" type="danger">
              {{ $t(errorText) }}
            </Alert>
            <img
              :alt="form.image"
              v-if="imgUrl"
              :src="imgUrl"
              class="mx-auto h-64"
            />
          </div>
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
            multiple
            vertical
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
            multiple
            vertical
          />
        </div>
        <template #footer>
          <Button
            :disabled="loading.submit"
            :loading="loading.submit"
            class="ml-auto"
            type="submit"
          >
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
import { computed, onMounted, reactive, ref, watch } from "vue";
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

const loading = reactive({
  uploadImage: false,
  deleteImage: false,
  submit: false,
});

watch(loading, (oldValue, newValue) => {
  if (Object.values(newValue).some((v) => v)) errorText.value = "";
});

const imgUrl = computed(() => new Dish(form).imgUrl);

const uploadImage = (event) => {
  loading.uploadImage = true;
  const image = event.target.files[0];
  new Dish(form)
    .uploadImage(image)
    .then(() => {
      form.image = image;
    })
    .finally(() => {
      loading.uploadImage = false;
    });
};

const deleteImage = () => {
  loading.deleteImage = true;
  new Dish(form)
    .deleteImage()
    .then(() => {
      form.image = "";
    })
    .finally(() => {
      loading.deleteImage = false;
    });
};

const handleSubmit = async () => {
  const isValid = Dish.validate(form);
  if (!isValid) {
    errorText.value = "dish.creation.error";
    return;
  }
  loading.submit = true;
  const dish = new Dish(form);
  const f = props.isUpdating ? dish.update : dish.create;
  await f.bind(dish)();
  loading.submit = false;
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
