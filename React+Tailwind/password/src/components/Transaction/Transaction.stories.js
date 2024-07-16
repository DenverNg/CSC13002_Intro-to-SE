import { Transaction } from ".";

export default {
  title: "Components/Transaction",
  component: Transaction,
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
    chatSearchFill: "/img/chat-search-fill-1.svg",
    chatSearchFillVectorClassName: {},
    chatSearchFillOverlapGroupClassName: {},
    chatSearchFillEllipseClassName: {},
    chatSearchFillVector: "/img/vector-231-4.svg",
    chatSearchFillSubtractClassName: {},
    chatSearchFillChatSearchFillClassName: {},
    chatSearchFillSubtract: "/img/subtract-23.svg",
    chatSearchFillClassName: {},
  },
};
