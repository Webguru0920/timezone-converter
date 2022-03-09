import { describe, it, expect, vitest } from "vitest";
import { config, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import CityAutocomplete from "../CityAutocomplete.vue";

describe("CityAutocomplete", () => {
  config.renderStubDefaultSlot = true;
  config.global.stubs = {
    "el-autocomplete": true,
    "el-button": true,
  };

  it("renders properly", () => {
    const wrapper = mount(CityAutocomplete);
    const cityAutoCompleteLabel = wrapper.find("[data-test='cityAutoCompleteLabel']");
    expect(cityAutoCompleteLabel.text()).toContain("City name");
    const cityAutoComplete = wrapper.find("[data-test='cityAutoComplete']");
    expect(cityAutoComplete.exists()).toBe(true);
    const addCityButton = wrapper.find("[data-test='addCityButton']");
    expect(addCityButton.text()).toContain("Add");
  });
});
