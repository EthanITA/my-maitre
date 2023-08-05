<template>
  <Container title="hall.label">
    <form @submit.prevent="handleSubmit">
      <Sheet class="flex-col gap-4 flex">
        <template #header v-if="errorText">
          <Alert type="danger">
            {{ $t(errorText) }}
          </Alert>
        </template>

        <Input :label="$t('hall.fields.name')" v-model="form.name" />
        <template #footer>
          <Button class="ml-auto" type="submit">
            {{ $t("hall.creation.submit") }}
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
import { useRouter } from "vue-router";
import Hall, { HallItem } from "../../models/Hall";

const router = useRouter();
const errorText = ref<string>("");

const props = defineProps<{
  form?: HallItem;
  isUpdating?: boolean;
}>();

const form = reactive<HallItem>({
  name: props.form?.name ?? "",
});

const handleSubmit = async () => {
  errorText.value = "";
  if (!Hall.validate(form)) {
    errorText.value = "hall.creation.error";
    return;
  }
  const hall = new Hall(form);
  console.log(hall);
  const f = props.isUpdating ? hall.update : hall.create;
  await f.bind(hall)();
  await router.push("/hall");
};
</script>

<style scoped></style>
