import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("loaderStore", () => {
  const loading = ref(false);
  const setLoading = (value: boolean) => {
    loading.value = value;
  };
  return {
    loading,
    setLoading,
  };
});
