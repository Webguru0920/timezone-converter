<template>
  <div class="mt-8">
    <div>
      <label
        data-test="timeInputLabel"
        class="block text-xl mb-2 text-gray-700"
      >
        Enter time
      </label>
      <el-time-picker
        data-test="timePicker"
        v-model="currentTime"
        format="HH:mm"
        :clearable="false"
        @change="stopTimer()"
      />
    </div>
    <el-link
      data-test="currentTimeLink"
      href="#"
      class="underline"
      :underline="false"
      @click.prevent="startTimer()"
    >
      Use current time
    </el-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const timer = ref();
const currentTime = ref();
const props = defineProps({
  time: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["update:time"]);

const setCurrentTime = () => {
  currentTime.value = new Date();
};

const startTimer = () => {
  stopTimer();
  setCurrentTime();
  timer.value = setInterval(() => {
    setCurrentTime();
  }, 10000); // set 10s instead of 1min to update time accurately
};

const stopTimer = () => {
  // clear old timer
  clearInterval(timer.value);
};

onMounted(() => {
  if (props.time) {
    currentTime.value = props.time;
    return;
  }
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});

watch(currentTime, () => {
  emit("update:time", currentTime.value);
});
</script>
