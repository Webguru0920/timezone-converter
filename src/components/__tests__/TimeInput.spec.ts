import { describe, it, expect, vitest } from "vitest";
import { config, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import TimeInput from "../TimeInput.vue";

describe("TimeInput", () => {
  config.renderStubDefaultSlot = true;
  config.global.stubs = {
    "el-time-picker": true,
    "el-link": true,
  };

  it("renders properly", () => {
    const wrapper = mount(TimeInput);
    const timeInputLabel = wrapper.find("[data-test='timeInputLabel']");
    expect(timeInputLabel.text()).toContain("Enter time");
    const timePicker = wrapper.find("[data-test='timePicker']");
    expect(timePicker.exists()).toBe(true);
    const currentTimeLink = wrapper.find("[data-test='currentTimeLink']");
    expect(currentTimeLink.text()).toContain("Use current time");
  });

  it("starts timer after currentTimeLink is clicked", async () => {
    const wrapper = mount(TimeInput);
    const currentTimeLink = wrapper.find("[data-test='currentTimeLink']");
    wrapper.vm.startTimer = vitest.fn();
    await currentTimeLink.trigger("click");
    expect(wrapper.vm.startTimer).toBeCalled();
  });

  it("emits time after currentTime is changes", async () => {
    const wrapper = mount(TimeInput);
    wrapper.vm.setCurrentTime();
    await nextTick();
    expect(wrapper.emitted()).toHaveProperty("update:time");
  });
});
