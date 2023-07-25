<template>
  <div>
    <Tabs v-model="selectedTab" variant="underline" directive="if">
      <Tab
        v-for="tab in availableTabs"
        :key="tab"
        :title="$t(`menu.types.${tab}`)"
        :name="tab"
      >
        {{ tab }}
      </Tab>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Tab, Tabs } from "flowbite-vue";
import { onMounted, ref } from "vue";
import { menuTypes } from "../../models/Menu";
import Order, { OrderItem } from "../../models/Order.ts";

const availableTabs = ["all", ...menuTypes];
const selectedTab = ref<(typeof availableTabs)[number]>("all");
const orders = ref<OrderItem[]>([]);

onMounted(() => {
  Order.getAll().then((data) => (orders.value = data));
});
</script>
<style scoped></style>
