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
  rowDisabled?: (row: any) => boolean;
  clickRow?: (row: any) => void;
}>();
</script>

<template>
  <Table>
    <TableHead>
      <TableHeadCell v-for="header in headers" class="whitespace-nowrap"
        >{{ $t(`${prefix ? prefix + "." : ""}${header}`) }}
      </TableHeadCell>
      <TableHeadCell class="right-0 sr-only"
        >{{ $t("table.actions") }}
      </TableHeadCell>
    </TableHead>
    <TableBody>
      <TableRow
        v-if="data.length"
        v-for="d in data"
        :class="{
          'hover:bg-blue-100 cursor-pointer': clickRow && !rowDisabled?.(d),
        }"
        @click="!rowDisabled?.(d) && clickRow?.(d)"
      >
        <template v-for="header in headers">
          <TableCell
            class="text-left whitespace-nowrap"
            :class="{
              'cursor-not-allowed !bg-gray-200 opacity-50': rowDisabled?.(d),
            }"
          >
            <div v-if="$slots[header]">
              <slot :value="d" :name="header" />
            </div>
            <div v-else>
              {{ d[header] }}
            </div>
          </TableCell>
        </template>
        <TableCell
          class="sticky right-0 bg-white/70 shadow-lg cursor-auto"
          @click.stop
        >
          <div class="flex gap-1 float-right">
            <slot name="actions" :value="d" />
          </div>
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
