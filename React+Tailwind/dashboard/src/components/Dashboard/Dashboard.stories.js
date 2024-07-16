import { Dashboard } from ".";

export default {
  title: "Components/Dashboard",
  component: Dashboard,
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
    divClassName: {},
    chartFillClassName: {},
    chartFill: "/img/chart-fill-1.svg",
    chartFillSubtract: "/img/subtract-17.svg",
  },
};
