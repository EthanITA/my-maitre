<template>
  <MenuCreation
    v-if="menu?.id"
    :errorText="errorText"
    :form="menu"
    is-updating
  />
</template>
<script lang="ts" setup>
import MenuCreation from "../../components/Menu/MenuCreation.vue";
import { useRoute, useRouter } from "vue-router";
import Menu from "../../models/Menu";
import { ref } from "vue";
import notification from "../../store/notification.ts";

const route = useRoute();
const router = useRouter();
const notificationStore = notification();
const menuId = route.params.id as string;
const menu = ref<Menu>();
const errorText = ref<string>("");
Menu.get(Number(menuId))
  .then((m) => {
    menu.value = new Menu(m);
  })
  .catch(() => router.push("/menu"));
</script>

<style scoped></style>
