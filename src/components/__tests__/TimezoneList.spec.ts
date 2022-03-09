import { describe, it, expect } from "vitest";
import { config, mount } from "@vue/test-utils";
import { faker } from "@faker-js/faker";
import TimezoneList from "../TimezoneList.vue";

describe("TimezoneList", () => {
  config.global.stubs = {
    "el-table": true,
    "el-table-column": true,
    "el-icon": true,
  };

  it("renders properly", () => {
    const wrapper = mount(TimezoneList);
    const timezoneListLabel = wrapper.find("[data-test='timezoneListLabel']");
    expect(timezoneListLabel.text()).toContain("Your timezones");
    const timezoneTable = wrapper.find("[data-test='timezoneTable']");
    expect(timezoneTable.exists()).toBe(true);
  });

  it("gets citytime correctly", () => {
    const now = new Date();
    const wrapper = mount(TimezoneList, {
      props: {
        time: now,
      },
    });
    expect(wrapper.vm.getCityTime("")).toBe("");
    expect(wrapper.vm.getCityTime(faker.address.timeZone())).toBeTruthy();
  });
});
