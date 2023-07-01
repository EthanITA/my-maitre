<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-vue";

defineProps<{
  headers: string[];
  data: any[];
  prefix?: string; // prefix for translation
}>();
</script>

<template>
  <Table>
    <TableHead>
      <TableHeadCell v-for="header in headers"
        >{{ $t(`${prefix ? prefix + "." : ""}${header}`) }}
      </TableHeadCell>
      <TableHeadCell class="right-0 sr-only"
        >{{ $t("table.actions") }}
      </TableHeadCell>
    </TableHead>
    <TableBody>
      <TableRow v-if="data.length" v-for="d in data">
        <template v-for="header in headers">
          <TableCell class="text-left">
            <div v-if="$slots[header]">
              <slot :value="d" :name="header" />
            </div>
            <div v-else>
              {{ d[header] }}
            </div>
          </TableCell>
        </template>
        <TableCell class="sticky right-0 bg-white/70 shadow-lg">
          <slot name="actions" :value="d" />
        </TableCell>
      </TableRow>
      <TableRow v-else>
        <TableCell :colspan="headers.length + 1">
          <div class="text-center text-lg">
            {{ $t("table.noData") }}
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style scoped></style>
