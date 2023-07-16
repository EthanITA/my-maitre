<template>
  <Container
    description="menu.creation.description"
    title="menu.creation.label"
  >
    <template v-if="isUpdating" #action>
      <Button
        :disabled="loading.hidingPrice || !form.enabled"
        :loading="loading.hidingPrice"
        outline
        size="sm"
        @click="handleToggleHidePrice"
      >
        <div class="flex gap-2 items-center">
          {{
            form.hide_price
              ? $t("menu.fields.showPrice")
              : $t("menu.fields.hidePrice")
          }}
        </div>
      </Button>
      <Button
        :color="form.enabled ? 'red' : 'default'"
        :disabled="enabling"
        :loading="enabling"
        outline
        size="sm"
        @click="handleToggleEnable"
      >
        {{ form.enabled ? $t("menu.disable") : $t("menu.enable") }}
      </Button>
    </template>
    <form @submit.prevent="handleSubmit">
      <Sheet :disabled="!form.enabled" class="flex-col gap-4 flex">
        <template v-if="errorText" #header>
          <Alert type="danger">
            {{ $t(errorText) }}
          </Alert>
        </template>
        <Input v-model="form.name" :label="$t('menu.fields.name')" />
        <Input
          v-model="form.description"
          :label="$t('menu.fields.description')"
        />
        <ButtonSelect
          v-model="form.type"
          :label="$t('menu.fields.menuType')"
          :options="
            menuTypes.map((type) => ({
              name: $t(`menu.types.${type}`),
              value: type,
            }))
          "
        />
        <Divider />
        <div class="flex gap-8 items-center">
          <div class="flex gap-2 mb-auto">
            <Input
              v-model="form.open_hours.start"
              :label="$t('menu.fields.startTime')"
              type="time"
            />
            <Input
              v-model="form.open_hours.end"
              :label="$t('menu.fields.endTime')"
              type="time"
            />
          </div>
          <div>
            <ButtonSelect
              :label="$t('menu.fields.visibility')"
              :modelValue="form.visibility.type"
              :options="
                visibilities.map((visibility) => ({
                  name: $t(`menu.visibilities.${visibility}`),
                  value: visibility,
                }))
              "
              class="whitespace-nowrap"
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
              <DaySelect
                v-if="form.visibility.type === 'weekdays'"
                v-model="form.visibility.availability as Weekday[]"
                multiple
              />
              <div
                v-else-if="form.visibility.type === 'days'"
                class="flex flex-col gap-2"
              >
                <div class="flex gap-1">
                  <Input
                    v-model="selectedDate"
                    :label="$t('menu.fields.days')"
                    type="date"
                  />
                  <Button
                    class="mt-auto"
                    pill
                    square
                    type="button"
                    @click="handleAddDate"
                  >
                    <PlusIcon class="w-5 h-5" />
                  </Button>
                </div>
                <DaysList
                  v-model="form.visibility.availability as string[]"
                  class="flex-wrap"
                />
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <Button
            :disabled="loading.submit"
            :loading="loading.submit"
            class="ml-auto"
            type="submit"
          >
            {{ $t("menu.creation.submit") }}
          </Button>
        </template>
      </Sheet>
    </form>
  </Container>
</template>
<script lang="ts" setup>
import Container from "../Container.vue";
import Sheet from "../Sheet.vue";
import { Alert, Button, Input } from "flowbite-vue";
import Menu, { MenuItem, menuTypes, visibilities } from "../../models/Menu";
import Divider from "../Divider.vue";
import { reactive, ref } from "vue";
import ButtonSelect from "../ButtonSelect.vue";
import DaySelect from "../DaySelect.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { Weekday } from "../../models/Custom/DatetimeTypes.ts";
import _ from "lodash";
import { useRouter } from "vue-router";
import DaysList from "../DaysList.vue";
import notification from "../../store/notification.ts";

const props = defineProps<{
  form?: MenuItem;
  isUpdating?: boolean;
}>();

const defaultMenu = Menu.default.safeParse(props.form);
if (!defaultMenu.success) {
  notification().addNotification({
    type: "danger",
    message: "menu.error",
  });
  useRouter().push("/menu");
}
const form = reactive<MenuItem>(
  defaultMenu.success ? defaultMenu.data : Menu.default.parse(undefined)
);
const loading = reactive({
  submit: false,
  enabling: false,
  hidingPrice: false,
});
const enabling = ref<boolean>(false);
const router = useRouter();

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

const handleToggleEnable = () => {
  const menu = new Menu({
    ...form,
    enabled: !form.enabled,
  });
  loading.enabling = true;
  menu
    .enable()
    .then(() => (form.enabled = !form.enabled))
    .finally(() => (loading.enabling = false));
};

const handleToggleHidePrice = () => {
  enabling.value = false;
  const menu = new Menu({
    ...form,
    hide_price: !form.hide_price,
  });
  menu
    .hidePrice()
    .then(() => (form.hide_price = !form.hide_price))
    .finally(() => (loading.hidingPrice = false));
};
</script>

<style scoped></style>
