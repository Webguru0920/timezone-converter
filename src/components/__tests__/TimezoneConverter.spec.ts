import { describe, it, expect, vitest } from "vitest";
import { config, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import TimezoneConverter from "../TimezoneConverter.vue";
import TimeInput from "../TimeInput.vue";
import TimezoneList from "../TimezoneList.vue";
import CityAutocomplete from "../CityAutocomplete.vue";

describe("TimezoneConverter", () => {
  config.renderStubDefaultSlot = true;
  config.global.stubs = {
    "time-input": true,
    "timezone-list": true,
    "city-autocomplete": true,
  };

  it("renders properly", () => {
    const wrapper = mount(TimezoneConverter);
    const timeInput = wrapper.findComponent(TimeInput);
    expect(timeInput.exists()).toBe(true);
    const timezoneList = wrapper.findComponent(TimezoneList);
    expect(timezoneList.exists()).toBe(true);
    const cityAutocomplete = wrapper.findComponent(CityAutocomplete);
    expect(cityAutocomplete.exists()).toBe(true);
  });
});
