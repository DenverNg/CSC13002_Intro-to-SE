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
    chartFill: "/img/chart-fill-1.svg",
    divClassName: {},
    chartFillChartFillClassName: {},
    chartFillSubtractClassName: {},
    chartFillSubtract: "/img/subtract-17.svg",
  },
};
