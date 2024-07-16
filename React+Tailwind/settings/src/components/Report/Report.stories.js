import { Report } from ".";

export default {
  title: "Components/Report",
  component: Report,
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
    reportClassName: {},
    subtractClassName: {},
    subtract: "/img/subtract-20.svg",
    img: "/img/subtract-21.svg",
  },
};
