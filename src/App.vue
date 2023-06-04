<script setup>
import { ref } from 'vue'
import { Tabs, Tab } from 'flowbite-vue'
const activeTab = ref('first')
</script>
<template>
  <tabs variant="pills" v-model="activeTab" class="p-5"> <!-- class appends to content DIV for all tabs -->
    <tab name="first" title="First">
      Lorem...
    </tab>
    <tab name="second" title="Second">
      Lorem...
    </tab>
    <tab name="third" title="Third">
      Lorem...
    </tab>
    <tab name="fourth" title="Fourth" :disabled="true">
      Lorem...
    </tab>
  </tabs>
</template>
