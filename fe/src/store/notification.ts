import { defineStore } from "pinia";
import { ref } from "vue";
import _ from "lodash";
//@ts-ignore
import { ToastType } from "flowbite-vue/dist/components/Toast/types";

interface Notification {
  id: number;
  message: string;
  type: ToastType;
  timeout?: number; // in ms; if not set, notification will not disappear automatically
}

export default defineStore("notificationStore", () => {
  const id = ref<number>(0);
  const notifications = ref<Notification[]>([]);
  const defaultTimeout = 5000;

  const removeNotification = (id: Notification["id"]) =>
    _.remove(notifications.value, (n) => n.id === id);

  const addNotification = (newNotification: Omit<Notification, "id">) => {
    const currentId = id.value++;

    const notification = {
      timeout: defaultTimeout,
      ...newNotification,
      id: currentId,
    };
    notifications.value.push(notification);

    const { timeout } = notification;
    if (timeout) {
      setTimeout(() => {
        removeNotification(currentId);
      }, timeout);
    }

    return currentId;
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
});
