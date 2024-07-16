/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

export const KhungNhPThNgBO = ({
  property1,
  className,
  overlapGroupClassName,
  rectangleClassName,
  divClassName,
  rectangleClassNameOverride,
  divClassNameOverride,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`w-[528px] h-[98px] ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div
        className={`h-[98px] relative ${
          ["variant-2", "variant-4"].includes(state.property1) ? "left-1" : ""
        } ${overlapGroupClassName}`}
      >
        {["default", "variant-3"].includes(state.property1) && (
          <>
            <div
              className={`border-[#7065d2] w-[528px] left-0 top-[17px] h-[81px] rounded-2xl bg-white absolute ${
                state.property1 === "variant-3" ? "border-2 border-solid" : "border border-solid"
              } ${rectangleClassName}`}
            />
            <div
              className={`[font-family:'Inter',Helvetica] tracking-[0] text-[38.3px] text-[#7065d2] font-semibold leading-[normal] absolute ${
                state.property1 === "variant-3" ? "w-[166px]" : "w-[175px]"
              } ${state.property1 === "variant-3" ? "left-[181px]" : "left-44"} ${
                state.property1 === "default" ? "opacity-[0.82]" : ""
              } ${state.property1 === "variant-3" ? "top-[35px]" : "top-[34px]"} ${divClassName}`}
            >
              06/2024
            </div>
            <div
              className={`[background:linear-gradient(180deg,rgb(238,236,255)_0%,rgb(255,255,255)_100%)] w-[177px] left-[22px] top-0 blur-[11.1px] h-9 absolute ${rectangleClassNameOverride}`}
            />
            <div
              className={`[font-family:'Inter',Helvetica] w-[168px] left-[35px] tracking-[0] text-[23.3px] top-px text-[#7065d2] font-medium leading-[28.2px] absolute ${
                state.property1 === "default" ? "opacity-[0.68]" : ""
              } ${divClassNameOverride}`}
            >
              Tháng báo cáo
            </div>
          </>
        )}

        {["variant-2", "variant-4"].includes(state.property1) && (
          <>
            <div className="border-2 border-solid border-[#5645eb] w-[528px] left-0 top-[17px] h-[81px] rounded-2xl bg-white absolute" />
            <div className="[font-family:'Inter',Helvetica] w-[175px] left-[174px] italic tracking-[0] text-[38.3px] opacity-[0.46] top-[35px] text-[#7065d2] font-medium leading-[normal] absolute">
              mm/yyyy
            </div>
            <div className="[background:linear-gradient(180deg,rgb(238,236,255)_0%,rgb(255,255,255)_100%)] w-[246px] left-[18px] top-0 blur-[11.1px] h-9 absolute" />
            <div className="[font-family:'Inter',Helvetica] w-[255px] left-[31px] tracking-[0] text-[23.3px] top-px text-[#5645eb] font-semibold leading-[28.2px] absolute">
              Nhập tháng báo cáo
            </div>
            <div
              className={`[font-family:'Inter',Helvetica] left-40 tracking-[0] text-[38.3px] top-[35px] text-[#5645eb] font-normal leading-[normal] absolute ${
                state.property1 === "variant-4" ? "opacity-0" : ""
              }`}
            >
              |
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          property1: "variant-3",
        };
    }
  }

  if (state.property1 === "variant-3") {
    switch (action) {
      case "mouse_leave":
        return {
          property1: "default",
        };

      case "click":
        return {
          property1: "variant-2",
        };
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  if (state.property1 === "variant-4") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

KhungNhPThNgBO.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
};
