/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

export const InBOCO = ({
  property1,
  className,
  overlapGroupClassName,
  rectangleClassName,
  rectangle = "/img/rectangle-4117.svg",
  vectorClassName,
  vector = "/img/vector-57.svg",
  rectangleClassNameOverride,
  img = "/img/rectangle-4134.svg",
  vectorClassNameOverride,
  vector1 = "/img/vector-56.svg",
  imgClassName,
  vector2 = "/img/vector-58.svg",
  divClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`${state.property1 === "variant-2" ? "w-[117px]" : "w-[93px]"} ${
        state.property1 === "default" ? "opacity-[0.73]" : ""
      } ${state.property1 === "variant-2" ? "h-[88px]" : "h-[70px]"} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div
        className={`top-px relative ${state.property1 === "variant-2" ? "-left-2" : "-left-1.5"} ${
          state.property1 === "variant-2" ? "h-[83px]" : "h-[67px]"
        } ${overlapGroupClassName}`}
      >
        <img
          className={`absolute ${state.property1 === "variant-2" ? "w-[63px]" : "w-[50px]"} ${
            state.property1 === "variant-2" ? "left-[25px]" : "left-5"
          } ${state.property1 === "variant-2" ? "top-[13px]" : "top-2.5"} ${
            state.property1 === "variant-2" ? "h-7" : "h-[22px]"
          } ${rectangleClassName}`}
          alt="Rectangle"
          src={state.property1 === "variant-2" ? "/img/rectangle-4117-1.svg" : rectangle}
        />
        <img
          className={`absolute ${state.property1 === "variant-2" ? "w-11" : "w-[35px]"} ${
            state.property1 === "variant-2" ? "left-[35px]" : "left-7"
          } ${state.property1 === "variant-2" ? "top-[23px]" : "top-[18px]"} ${
            state.property1 === "variant-2" ? "h-[41px]" : "h-8"
          } ${vectorClassName}`}
          alt="Vector"
          src={state.property1 === "variant-2" ? "/img/vector-57-1.svg" : vector}
        />
        <img
          className={`top-0 absolute ${state.property1 === "variant-2" ? "w-11" : "w-[35px]"} ${
            state.property1 === "variant-2" ? "left-[35px]" : "left-7"
          } ${state.property1 === "variant-2" ? "h-[15px]" : "h-3"} ${rectangleClassNameOverride}`}
          alt="Rectangle"
          src={state.property1 === "variant-2" ? "/img/rectangle-4134-1.svg" : img}
        />
        <img
          className={`absolute ${state.property1 === "variant-2" ? "w-[15px]" : "w-3"} ${
            state.property1 === "variant-2" ? "left-12" : "left-[38px]"
          } ${state.property1 === "variant-2" ? "top-9" : "top-7"} ${
            state.property1 === "variant-2" ? "h-[5px]" : "h-1"
          } ${vectorClassNameOverride}`}
          alt="Vector"
          src={state.property1 === "variant-2" ? "/img/vector-56-1.svg" : vector1}
        />
        <img
          className={`absolute ${state.property1 === "variant-2" ? "w-5" : "w-4"} ${
            state.property1 === "variant-2" ? "left-12" : "left-[38px]"
          } ${state.property1 === "variant-2" ? "top-[46px]" : "top-9"} ${
            state.property1 === "variant-2" ? "h-[5px]" : "h-1"
          } ${imgClassName}`}
          alt="Vector"
          src={state.property1 === "variant-2" ? "/img/vector-58-1.svg" : vector2}
        />
        <div
          className={`text-transparent leading-[normal] [font-family:'Inter',Helvetica] absolute font-semibold whitespace-nowrap [-webkit-text-fill-color:transparent] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(136.46,86.13,201.88)_100%)] [text-fill-color:transparent] left-0 tracking-[0] [-webkit-background-clip:text] bg-clip-text ${
            state.property1 === "variant-2" ? "top-[60px]" : "top-[49px]"
          } ${state.property1 === "variant-2" ? "w-[117px]" : "w-[93px]"} ${
            state.property1 === "variant-2" ? "text-[22.1px]" : "text-[17.5px]"
          } ${divClassName}`}
        >
          In báo cáo
        </div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "variant-2",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

InBOCO.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
  rectangle: PropTypes.string,
  vector: PropTypes.string,
  img: PropTypes.string,
  vector1: PropTypes.string,
  vector2: PropTypes.string,
};
