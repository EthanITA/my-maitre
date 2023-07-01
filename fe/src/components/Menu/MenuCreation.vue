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
            :modelValue="form.visibility.type"
            @update:modelValue="
              ($event) => {
                form.visibility.type = $event;
                form.visibility.availability = [];
              }
            "
          />
          <template v-if="enableVisilibity">
            <template v-if="form.visibility.type === 'everyday'">
              <Input
                type="time"
                v-model="form.visibility.availability![0]"
                :label="$t('menu.fields.startTime')"
              />
              <Input
                type="time"
                :label="$t('menu.fields.endTime')"
                v-model="form.visibility.availability![1]"
              />
            </template>
            <template v-else-if="form.visibility.type === 'weekdays'">
              <DaySelect
                multiple
                v-model="form.visibility.availability as Weekday[]"
              />
            </template>
            <template v-else-if="form.visibility.type === 'days'">
              <div class="flex flex-col gap-2">
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
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="day in form.visibility.availability"
                    :key="day"
                    class="justify-between !text-xs pr-1 font-bold flex items-center gap-1 py-1 px-3"
                  >
                    <p>{{ new Date(day).toLocaleDateString() }}</p>
                    <div
                      class="rounded-full p-0.5 cursor-pointer"
                      @click="
                        form.visibility.availability = _.filter(
                          form.visibility.availability as string[],
                          (d) => d !== day
                        )
                      "
                    >
                      <XMarkIcon class="w-3 h-3 text-red-700" />
                    </div>
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
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { Weekday } from "../../models/Custom/DatetimeTypes.ts";
import _ from "lodash";

const props = defineProps<{
  form?: MenuItem;
  isUpdating?: boolean;
}>();

const form = reactive<MenuItem>({
  id: props.form?.id ?? 0,
  name: props.form?.name ?? "",
  description: props.form?.description ?? "",
  icon: props.form?.icon ?? "",
  hide_price: props.form?.hide_price ?? false,
  order_type: props.form?.order_type ?? "standard",
  visibility: props.form?.visibility ?? {},
  location_id: props.form?.location_id ?? 0,
});

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
  const isValid = Menu.validate(form);
  if (!isValid) {
    errorText.value = "menu.creation.error";
    return;
  }
  const menu = new Menu(form);
  const f = props.isUpdating ? menu.update : menu.create;
  await f.bind(menu)();
};
</script>

<style scoped></style>
