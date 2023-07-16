<template>
  <Container
    title="menu.creation.label"
    description="menu.creation.description"
  >
    <form @submit.prevent="handleSubmit">
      <Sheet class="flex-col gap-4 flex">
        <template #header v-if="errorText">
          <Alert type="danger">
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
          v-model="form.type"
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
            :modelValue="form.visibility.type"
            @update:modelValue="
              ($event) => {
                form.visibility.type = $event;
                form.visibility.availability = [];
                form.open_hours = {
                  start: '00:00',
                  end: '23:59',
                };
              }
            "
          />
          <div
            :class="{ invisible: !Object.keys(form.visibility || {}).length }"
            class="flex flex-col gap-4"
          >
            <div class="flex gap-2">
              <Input
                type="time"
                v-model="form.open_hours.start"
                :label="$t('menu.fields.startTime')"
              />
              <Input
                type="time"
                :label="$t('menu.fields.endTime')"
                v-model="form.open_hours.end"
              />
            </div>

            <DaySelect
              v-if="form.visibility.type === 'weekdays'"
              multiple
              v-model="form.visibility.availability as Weekday[]"
            />
            <div
              class="flex flex-col gap-2"
              v-else-if="form.visibility.type === 'days'"
            >
              <div class="flex gap-1">
                <Input
                  type="date"
                  v-model="selectedDate"
                  :label="$t('menu.fields.days')"
                />
                <Button
                  pill
                  square
                  class="mt-auto"
                  type="button"
                  @click="handleAddDate"
                >
                  <PlusIcon class="w-5 h-5" />
                </Button>
              </div>
              <DaysList
                class="flex-wrap"
                v-model="form.visibility.availability as string[]"
              />
            </div>
          </div>
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
<script setup lang="ts">
import Container from "../Container.vue";
import Sheet from "../Sheet.vue";
import { Alert, Button, Input } from "flowbite-vue";
import Menu, { MenuItem, menuTypes, visibilities } from "../../models/Menu";
import Divider from "../Divider.vue";
import { reactive, ref } from "vue";
import ButtonSelect from "../ButtonSelect.vue";
import Toggle from "../Toggle.vue";
import DaySelect from "../DaySelect.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { Weekday } from "../../models/Custom/DatetimeTypes.ts";
import _ from "lodash";
import { useRouter } from "vue-router";
import DaysList from "../DaysList.vue";

const props = defineProps<{
  form?: MenuItem;
  isUpdating?: boolean;
}>();

const form = reactive<MenuItem>(Menu.default.parse(props.form));

const router = useRouter();

const enableVisilibity = ref<boolean>(Object.keys(form.visibility).length > 0);
// yyyy-MM-dd
const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);
const errorText = ref<string>("");

const handleAddDate = () => {
  let dates = form.visibility.availability as string[];
  if (selectedDate.value) {
    dates.push(selectedDate.value);
    form.visibility.availability = _.sortBy(_.uniq(dates));
  }
};

const handleSubmit = async () => {
  errorText.value = "";
  if (!Menu.validate(form)) {
    errorText.value = "menu.creation.error";
    return;
  }
  const menu = new Menu(form);
  const f = props.isUpdating ? menu.update : menu.create;
  await f.bind(menu)();
  await router.push("/menu");
};
</script>

<style scoped></style>
