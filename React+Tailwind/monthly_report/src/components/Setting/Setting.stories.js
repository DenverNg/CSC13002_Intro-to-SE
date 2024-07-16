import { Setting } from ".";

export default {
  title: "Components/Setting",
  component: Setting,
  argTypes: {
    stateProp: {
      options: ["selected", "hovering", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    stateProp: "selected",
    className: {},
    settingFill: "/img/setting-fill-1.svg",
    divClassName: {},
    settingFillSubtract: "/img/subtract-14.svg",
    settingFillSettingFillClassName: {},
    settingFillSubtractClassName: {},
  },
};
