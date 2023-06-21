<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-vue";
import { ref } from "vue";

const headers = ref<string[]>([]);
const data = ref<
  {
    key: string;
    value: any;
  }[]
>([]);
</script>

<template>
  <Table>
    <TableHead>
      <TableHeadCell v-for="header in headers"
        >{{ $t(`table.${header}`) }}
      </TableHeadCell>
      <TableHeadCell v-if="$slots.actions" class="sr-only"
        >{{ $t("table.actions") }}
      </TableHeadCell>
    </TableHead>
    <TableBody>
      <TableRow v-for="{ key, value } in data">
        <template v-for="header in headers">
          <slot :value="value" :name="header" v-if="$slots[header]" />
          <TableCell v-else>{{ value[header] }}</TableCell>
        </template>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style scoped></style>
