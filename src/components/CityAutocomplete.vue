<template>
  <div class="my-8">
    <label class="block text-xl mb-2 text-gray-700"> City name </label>
    <el-autocomplete
      v-model="query"
      :fetch-suggestions="querySearch"
      class="inline-input"
      placeholder="Search city..."
      value-key="label"
      @select="handleSelect"
    />
    <el-button class="ml-2" :disabled="!isAddable" @click="addCity">
      Add
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import cityTimezones from "city-timezones";
import { ICity } from "../interfaces/city.interface";

defineProps({
  city: {
    type: Object,
    default: null,
  },
  isAddable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:city", "add"]);

const query = ref<string>("");

const getCities = (query = "") => {
  // mock replace api call
  const results = cityTimezones.findFromCityStateProvince(query);
  return Promise.resolve(
    results
      .filter((item) => item.timezone)
      .slice(0, 10)
      .map((item) => ({
        label: `${item.city} (${item.country})`,
        city: item.city,
        country: item.country,
        tz: item.timezone,
      }))
  );
};

const querySearch = async (query: string, cb) => {
  const results = await getCities(query || "");
  // call callback function to return cities
  cb(results);
};

const handleSelect = (item: ICity) => {
  emit("update:city", item);
};

const addCity = () => {
  emit("add");
  query.value = "";
};

onMounted(() => {
  getCities();
});
</script>
