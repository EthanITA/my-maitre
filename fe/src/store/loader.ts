import { defineStore } from "pinia";
import { ref } from "vue";
import _ from "lodash";

export default defineStore("loaderStore", () => {
  const loading = ref(false);
  const setLoading = _.debounce((value: boolean) => {
    loading.value = value;
  }, 150);
  return {
    loading,
    setLoading,
  };
});
