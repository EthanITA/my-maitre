<template>
  <div class="flex w-[100vw] h-[100vh]">
    <Sidebar class="fixed top-0 left-0 w-64 border-r-[1px]" />
    <div class="sm:pl-64 flex-col flex w-full">
      <Header class="border-b-[1px] w-full h-16" />
      <main class="py-10 h-full bg-gray-100 overflow-y-scroll">
        <div class="px-4 sm:px-6 lg:px-8 h-full">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="router">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
    <Loader />
    <Notifications />
  </div>
</template>
<script lang="ts" setup>
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import Notifications from "./components/Notifications.vue";
import Loader from "./components/Loader.vue";
</script>
<style scoped>
.router-enter-active,
.router-leave-active {
  transition: opacity 100ms ease;
}

.router-enter-from,
.router-leave-to {
  opacity: 0;
}
</style>
