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
    menu: "/img/menu-3.svg",
    transactionChatSearchFill: "/img/chat-search-fill.svg",
    dashboardChartFill: "/img/chart-fill.svg",
    logo: "/img/logo-3.png",
    settingSettingFill: "/img/setting-fill.svg",
  },
};
