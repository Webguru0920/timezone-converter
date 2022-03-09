<template>
  <div class="mt-8">
    <label
      data-test="timezoneListLabel"
      class="block text-xl mb-2 text-gray-700"
    >
      Your timezones
    </label>
    <el-table data-test="timezoneTable" class="max-w-[600px]" :data="cities">
      <el-table-column prop="label" label="City" />
      <el-table-column label="Time" width="80">
        <template #default="scope">
          <span>{{ getCityTime(scope.row.tz) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tz" label="TZ" width="200" />
      <el-table-column width="50">
        <template #default="scope">
          <el-icon
            size="small"
            type="danger"
            class="cursor-pointer"
            @click="$emit('delete', scope.$index)"
          >
            <delete color="#F56C6C" />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import moment from "moment-timezone";
import { Delete } from "@element-plus/icons-vue";

defineEmits(["delete"]);

const props = defineProps({
  cities: {
    type: Array,
    default: () => [],
  },
  time: {
    type: Object,
    default: null,
  },
});

/**
 * get citytime with given timezone
 * @timezone string
 *
 * @example
 * ```
 * getCityTime('Europe/Berlin')
 * ```
 */
const getCityTime = (timezone: string) => {
  return timezone ? moment(props.time).tz(timezone).format("HH:mm") : "";
};
</script>
