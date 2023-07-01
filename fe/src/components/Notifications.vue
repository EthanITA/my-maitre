<template>
  <Teleport to="body">
    <TransitionGroup
      tag="div"
      name="notification"
      class="fixed bottom-5 right-5 z-50 flex flex-col gap-2"
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-300"
      leave-to-class="opacity-0 translate-x-full"
      leave-from-class="opacity-100 translate-x-0"
    >
      <Toast
        class="shadow-2xl border transition"
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :type="notification.type"
        divide
        closable
        @close="notificationStore.removeNotification(notification.id)"
      >
        {{ $t(notification.message) }}
      </Toast>
    </TransitionGroup>
  </Teleport>
</template>
<script setup lang="ts">
import { Toast } from "flowbite-vue";
import notification from "../store/notification";

const notificationStore = notification();
</script>
