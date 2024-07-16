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
    transactionChatSearchFill: "/img/chat-search-fill.svg",
    reportSubtract: "/img/subtract-20.svg",
    logo: "/img/logo-1.png",
    settingSettingFill: "/img/setting-fill.svg",
  },
};
