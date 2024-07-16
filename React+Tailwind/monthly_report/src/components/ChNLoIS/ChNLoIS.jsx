/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

export const ChNLoIS = ({
  property1,
  className,
  overlapGroupClassName,
  vectorClassName,
  vector = "/img/vector-246-5.svg",
  divClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`w-[530px] h-[333px] ${state.property1 === "popdown" ? "relative" : ""} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      {["default", "hover", "kh-ng-k-h-n", "six-th-ng", "three-th-ng"].includes(state.property1) && (
        <div
          className={`border-[#7065d2] w-[528px] left-0.5 h-[81px] rounded-2xl bg-white relative ${
            state.property1 === "hover" ? "border-2 border-solid" : "border border-solid"
          } ${overlapGroupClassName}`}
        >
          <img
            className={`w-[29px] left-[476px] h-[15px] absolute ${
              state.property1 === "hover" ? "top-[30px]" : "top-8"
            } ${vectorClassName}`}
            alt="Vector"
            src={state.property1 === "default" ? "/img/vector-246.svg" : vector}
          />
          <div
            className={`[font-family:'Inter',Helvetica] w-[289px] tracking-[0] text-[27.5px] text-[#7065d2] absolute font-medium leading-[33.2px] ${
              state.property1 === "hover" ? "left-[22px]" : "left-[23px]"
            } ${state.property1 === "default" ? "opacity-[0.41]" : ""} ${
              state.property1 === "hover" ? "top-[21px]" : "top-[22px]"
            } ${divClassName}`}
          >
            {["default", "hover"].includes(state.property1) && <>Chọn loại sổ</>}

            {state.property1 === "three-th-ng" && <>Kì hạn 3 tháng</>}

            {state.property1 === "six-th-ng" && <>Kì hạn 6 tháng</>}

            {state.property1 === "kh-ng-k-h-n" && <>Không kì hạn</>}
          </div>
        </div>
      )}

      {state.property1 === "popdown" && (
        <>
          <div className="absolute w-[528px] h-[81px] top-0 left-0.5 bg-white rounded-2xl border border-solid border-[#7065d2]">
            <img className="absolute w-[29px] h-[15px] top-8 left-[476px]" alt="Vector" src="/img/vector-246-2.svg" />
            <div className="absolute w-[289px] top-[22px] left-[23px] opacity-[0.41] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[27.5px] tracking-[0] leading-[33.2px]">
              Chọn loại sổ
            </div>
          </div>
          <div className="absolute w-[528px] h-[243px] top-[90px] left-0.5 bg-white rounded-2xl border border-solid border-[#7065d2]">
            <div className="relative h-[243px] -top-px -left-px">
              <div className="absolute w-[528px] h-[81px] top-[162px] left-0">
                <div className="absolute w-[470px] top-3.5 left-[30px] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[27.5px] tracking-[0] leading-[33.2px]">
                  Kì hạn 6 tháng
                </div>
              </div>
              <div className="absolute w-[528px] h-[81px] top-[81px] left-0">
                <div className="absolute w-[470px] top-3.5 left-[30px] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[27.5px] tracking-[0] leading-[33.2px]">
                  Kì hạn 3 tháng
                </div>
              </div>
              <div className="absolute w-[528px] h-[81px] top-0 left-0">
                <div className="absolute w-[470px] top-3.5 left-[30px] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[27.5px] tracking-[0] leading-[33.2px]">
                  Không kì hạn
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

ChNLoIS.propTypes = {
  property1: PropTypes.oneOf(["six-th-ng", "default", "kh-ng-k-h-n", "three-th-ng", "popdown", "hover"]),
  vector: PropTypes.string,
};
