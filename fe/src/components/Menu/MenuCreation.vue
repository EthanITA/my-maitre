<script setup lang="ts">
import Container from "../Container.vue";
import Sheet from "../Sheet.vue";
import { Alert, Badge, Button, Input } from "flowbite-vue";
import Menu, { MenuItem, menuTypes, visibilities } from "../../models/Menu";
import Divider from "../Divider.vue";
import { reactive, ref } from "vue";
import ButtonSelect from "../ButtonSelect.vue";
import Toggle from "../Toggle.vue";
import DaySelect from "../DaySelect.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { Weekday } from "../../models/Custom/DatetimeTypes.ts";

const form = reactive<MenuItem>({
  id: 0,
  name: "",
  description: "",
  icon: "",
  hide_price: false,
  order_type: "standard",
  visibility: {},
  location_id: 0,
});

const enableVisilibity = ref<boolean>(false);
// yyyy-MM-dd
const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);
const errorText = ref<string>("");

const handleAddDate = () => {
  if (selectedDate.value) {
    (form!.visibility!.availability as string[]).push(selectedDate.value);
  }
};

const handleSubmit = async () => {
  errorText.value = "";
  const isValid = Menu.validate(form);
  if (!isValid) {
    errorText.value = "menu.creation.error";
    return;
  }
  await new Menu(form).create();
};
</script>

<template>
  <Container
    title="menu.creation.label"
    description="menu.creation.description"
  >
    <form @submit.prevent="handleSubmit">
      <Sheet class="flex-col gap-4 flex">
        <template #header v-if="errorText">
          <Alert type="danger" closable>
            {{ $t(errorText) }}
          </Alert>
        </template>
        <Input :label="$t('menu.fields.name')" v-model="form.name" />
        <Input
          :label="$t('menu.fields.description')"
          v-model="form.description"
        />
        <ButtonSelect
          :label="$t('menu.fields.menuType')"
          :options="
            menuTypes.map((type) => ({
              name: $t(`menu.types.${type}`),
              value: type,
            }))
          "
          v-model="form.order_type"
        />
        <Divider />
        <Toggle
          class="select-none"
          :label="$t('menu.fields.hidePrice')"
          rightLabel
          v-model="form.hide_price"
        />
        <div class="flex gap-8 items-center">
          <Toggle
            rightLabel
            :label="$t('menu.fields.visibility')"
            class="select-none items-center"
            v-model="enableVisilibity"
            @update:modelValue="form.visibility = {}"
          />
          <ButtonSelect
            vertical
            class="whitespace-nowrap"
            :disabled="!enableVisilibity"
            :options="
              visibilities.map((visibility) => ({
                name: $t(`menu.visibilities.${visibility}`),
                value: visibility,
              }))
            "
            :modelValue="form.visibility!.type"
            @update:modelValue="($event)=>{
            form.visibility!.type = $event
            form.visibility!.availability = []
          }"
          />
          <template v-if="enableVisilibity">
            <template v-if="form.visibility!.type === 'everyday'">
              <Input
                type="time"
                v-model="form!.visibility!.availability![0]"
                :label="$t('menu.fields.startTime')"
              />
              <Input
                type="time"
                :label="$t('menu.fields.endTime')"
                v-model="form!.visibility!.availability![1]"
              />
            </template>
            <template v-else-if="form.visibility!.type === 'weekdays'">
              <DaySelect
                multiple
                v-model="form!.visibility!.availability as Weekday[]"
              />
            </template>
            <template v-else-if="form.visibility!.type === 'days'">
              <div class="flex flex-col">
                <div class="flex gap-1">
                  <Input
                    type="date"
                    v-model="selectedDate"
                    :label="$t('menu.fields.days')"
                  />
                  <Button pill square class="mt-auto" @click="handleAddDate">
                    <PlusIcon class="w-5 h-5" />
                  </Button>
                </div>
                <div class="flex gap-1">
                  <Badge
                    v-for="day in form!.visibility!.availability"
                    :key="day"
                  >
                    {{ day }}
                  </Badge>
                </div>
              </div>
            </template>
          </template>
        </div>
        <template #footer>
          <Button class="ml-auto" type="submit">
            {{ $t("menu.creation.submit") }}
          </Button>
        </template>
      </Sheet>
    </form>
  </Container>
</template>

<style scoped></style>
