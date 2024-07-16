import { MenuAsset } from ".";

export default {
  title: "Components/MenuAsset",
  component: MenuAsset,
  argTypes: {
    state: {
      options: ["dashboard", "report", "setting", "transactions"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    state: "dashboard",
    className: {},
    dashboardChartFill: "/img/chart-fill.svg",
    logo: "/img/logo-3.png",
    settingSettingFill: "/img/setting-fill.svg",
  },
};
