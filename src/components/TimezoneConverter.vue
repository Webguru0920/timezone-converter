<template>
  <div class="container mx-auto mt-10 p-4">
    <h1 class="text-2xl mb-2 text-gray-700">Timezone Converter</h1>
    <time-input v-model:time="time" />
    <timezone-list :cities="cities" :time="time" @delete="handleDeleteCity" />
    <city-autocomplete
      v-model:city="city"
      :is-addable="isCityAddable"
      @add="handleAddCity"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import TimeInput from "./TimeInput.vue";
import TimezoneList from "./TimezoneList.vue";
import CityAutocomplete from "./CityAutocomplete.vue";
import { ICity } from "../interfaces/city.interface";

const time = ref<string>();
const city = ref<ICity>();
const cities = ref<ICity[]>([]);

/**
 * return flag to show whether city already added or not.
 */
const isCityAddable = computed(() => {
  return (
    city.value && !cities.value.some((item) => city.value.label === item.label)
  );
});

const handleAddCity = () => {
  // push by cloning object to avoid reference.
  cities.value.push({ ...city.value });
  city.value = undefined;
};

const handleDeleteCity = (index: number) => {
  cities.value.splice(index, 1);
};
</script>
