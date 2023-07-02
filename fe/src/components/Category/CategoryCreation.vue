<template>
  <Container title="category.label" description="category.description">
    <form @submit.prevent="handleSubmit">
      <Sheet class="flex-col gap-4 flex">
        <template #header v-if="errorText">
          <Alert type="danger">
            {{ $t(errorText) }}
          </Alert>
        </template>

        <Input :label="$t('category.fields.name')" v-model="form.name" />
        <template #footer>
          <Button class="ml-auto" type="submit">
            {{ $t("category.creation.submit") }}
          </Button>
        </template>
      </Sheet>
    </form>
  </Container>
</template>
<script setup lang="ts">
import Container from "../Container.vue";
import Sheet from "../Sheet.vue";
import { Alert, Button, Input } from "flowbite-vue";
import { reactive, ref } from "vue";
import Category, { CategoryItem } from "../../models/Category";
import { useRouter } from "vue-router";

const router = useRouter();
const errorText = ref<string>("");

const props = defineProps<{
  form?: CategoryItem;
  isUpdating?: boolean;
}>();

const form = reactive<CategoryItem>({
  id: props.form?.id ?? 0,
  name: props.form?.name ?? "",
  icon: props.form?.icon ?? "",
});

const handleSubmit = async () => {
  errorText.value = "";
  const isValid = Category.validate(form);
  if (!isValid) {
    errorText.value = "category.creation.error";
    return;
  }
  const category = new Category(form);
  const f = props.isUpdating ? category.update : category.create;
  await f.bind(category)();
  await router.push("/category");
};
</script>

<style scoped></style>
