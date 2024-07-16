import { InBOCO } from ".";

export default {
  title: "Components/InBOCO",
  component: InBOCO,
  argTypes: {
    property1: {
      options: ["variant-2", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "variant-2",
    className: {},
    overlapGroupClassName: {},
    rectangleClassName: {},
    rectangle: "/img/rectangle-4117.svg",
    vectorClassName: {},
    vector: "/img/vector-57.svg",
    rectangleClassNameOverride: {},
    img: "/img/rectangle-4134.svg",
    vectorClassNameOverride: {},
    vector1: "/img/vector-56.svg",
    imgClassName: {},
    vector2: "/img/vector-58.svg",
    divClassName: {},
  },
};
