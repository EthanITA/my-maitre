<template>
  <div class="flex w-[100vw] h-[100vh]">
    <Sidebar class="fixed top-0 left-0 z-40 w-64 border-r-[1px]" />
    <div class="sm:ml-64 flex-col flex w-full">
      <Header class="border-b-[1px] w-full h-16" />
      <router-view class="h-full p-4 bg-gray-100" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
</script>
