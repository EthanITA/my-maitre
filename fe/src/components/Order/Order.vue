<template>
  <Container :title="$t('order.label')" :description="$t('order.description')">
    <template #action>
      <Button @click="$router.push('/order/settings')">{{
        $t("order.settings")
      }}</Button>
    </template>
    <Sheet class="mt-0">
      <Tabs v-model="selectedTab" variant="underline" directive="if">
        <Tab
          v-for="tab in availableTabs"
          :key="tab"
          :title="$t(`menu.types.${tab}`)"
          :name="tab"
        >
          <p v-for="order in orders">{{ order }}</p>
        </Tab>
      </Tabs>
    </Sheet>
  </Container>
</template>
<script setup lang="ts">
import { Button, Tab, Tabs } from "flowbite-vue";
import { onMounted, ref } from "vue";
import { menuTypes } from "../../models/Menu";
import Order, { OrderItem } from "../../models/Order.ts";
import Container from "../Container.vue";
import Sheet from "../Sheet.vue";

const availableTabs = ["toApprove", ...menuTypes];
const selectedTab = ref<(typeof availableTabs)[number]>(availableTabs[0]);
const orders = ref<OrderItem[]>([]);

onMounted(() => {
  Order.getAll().then((data) => (orders.value = data));
});
</script>
<style scoped></style>
