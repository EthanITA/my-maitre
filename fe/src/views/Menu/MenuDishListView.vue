<template>
  <MenuDishList :menuId="Number($route.params.id)" />
</template>

<script lang="ts" setup>
import MenuDishList from "../../components/Menu/MenuDishList.vue";
</script>
<style scoped></style>
