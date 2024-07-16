import { ChNLoIS } from ".";

export default {
  title: "Components/ChNLoIS",
  component: ChNLoIS,
  argTypes: {
    property1: {
      options: ["six-th-ng", "default", "kh-ng-k-h-n", "three-th-ng", "popdown", "hover"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "six-th-ng",
    className: {},
    overlapGroupClassName: {},
    vectorClassName: {},
    vector: "/img/vector-246-5.svg",
    divClassName: {},
  },
};
