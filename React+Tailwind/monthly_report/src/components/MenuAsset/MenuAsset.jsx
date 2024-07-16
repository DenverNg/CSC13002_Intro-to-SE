/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Dashboard } from "../Dashboard";
import { Report } from "../Report";
import { Setting } from "../Setting";
import { Transaction } from "../Transaction";

export const MenuAsset = ({
  state,
  className,
  dashboardChartFill = "/img/chart-fill.svg",
  logo = "/img/logo-3.png",
  settingSettingFill = "/img/setting-fill.svg",
}) => {
  return (
    <div
      className={`w-[279px] h-[1080px] ${
        ["dashboard", "report", "transactions"].includes(state) ? "bg-[100%_100%]" : ""
      } ${
        state === "dashboard"
          ? "bg-[url(/static/img/menu.svg)]"
          : state === "transactions"
          ? "bg-[url(/static/img/menu-1.svg)]"
          : state === "report"
          ? "bg-[url(/static/img/menu-2.svg)]"
          : ""
      } ${["dashboard", "report", "transactions"].includes(state) ? "relative" : ""} ${className}`}
    >
      {["dashboard", "report", "transactions"].includes(state) && (
        <>
          <Transaction
            chatSearchFill={state === "report" ? "/img/chat-search-fill.svg" : undefined}
            chatSearchFillChatSearchFillClassName={
              state === "transactions" ? "!h-10 !absolute !left-0 !w-10 !top-0" : undefined
            }
            chatSearchFillClassName={
              state === "transactions" ? "!text-2xl ![white-space:unset] !left-[51px] !w-[173px] !top-1" : undefined
            }
            chatSearchFillEllipseClassName={
              state === "transactions"
                ? "!border-accent !h-3 !rounded-[5.86px] !border-[2.01px] !border-solid !left-[19px] !w-3 !top-4"
                : undefined
            }
            chatSearchFillOverlapGroupClassName={
              state === "transactions" ? "!h-[30px] !left-[3px] !w-[33px] !top-[5px]" : undefined
            }
            chatSearchFillSubtract={state === "transactions" ? "/img/subtract-4.svg" : undefined}
            chatSearchFillSubtractClassName={state === "transactions" ? "!h-[30px] !w-[33px]" : undefined}
            chatSearchFillVector={state === "transactions" ? "/img/vector-231-1.svg" : undefined}
            chatSearchFillVectorClassName={
              state === "transactions" ? "!h-[5px] !left-[27px] !w-[5px] !top-6" : undefined
            }
            className={
              state === "transactions"
                ? "!h-10 !absolute !left-[46px] !w-56 !top-[522px]"
                : "!absolute !left-16 !top-[527px]"
            }
            stateProp={state === "transactions" ? "selected" : "default"}
          />
          <Report
            className={
              state === "report"
                ? "!h-9 !absolute !left-[67px] !w-[212px] !top-[613px]"
                : "!absolute !left-[67px] !top-[617px]"
            }
            reportClassName={
              state === "report" ? "!text-2xl ![white-space:unset] !left-[43px] !w-[169px] !top-[5px]" : undefined
            }
            stateProp={state === "report" ? "selected" : "default"}
            subtract={state === "report" ? "/img/subtract-8.svg" : undefined}
            subtractClassName={state === "report" ? "!h-9 !w-7" : undefined}
          />
          <Dashboard
            chartFill={dashboardChartFill}
            chartFillChartFillClassName={state === "dashboard" ? "!h-10 !absolute !left-0 !w-10 !top-0" : undefined}
            chartFillSubtract={state === "dashboard" ? "/img/subtract-2.svg" : undefined}
            chartFillSubtractClassName={state === "dashboard" ? "!h-[30px] !left-[3px] !w-[34px]" : undefined}
            className={
              state === "dashboard"
                ? "!h-10 !absolute !left-[57px] !w-[216px] !top-[429px]"
                : "!absolute !left-[60px] !top-[435px]"
            }
            divClassName={state === "dashboard" ? "!text-2xl !left-[51px] !w-[165px] !top-[5px]" : undefined}
            stateProp={state === "dashboard" ? "selected" : "default"}
          />
          <div className="w-[173px] left-[57px] top-[61px] h-[250px] absolute">
            <div className="w-[159px] -left-0.5 -top-px h-52 absolute">
              <div className="[font-family:'Inter',Helvetica] w-[135px] left-[15px] tracking-[0] text-[33px] top-[168px] text-background absolute [text-shadow:0px_4.27px_2.67px_#00000040] font-extrabold whitespace-nowrap leading-[normal]">
                SE Bank
              </div>
              <img
                className="w-[159px] left-0 top-0 object-cover h-[170px] absolute"
                alt="Logo"
                src={state === "report" ? logo : "/img/logo-1.png"}
              />
            </div>
            <div className="[font-family:'Inter',Helvetica] w-[169px] left-0 tracking-[0] text-[19px] opacity-80 top-[214px] text-background absolute [text-shadow:0px_5.32px_3.32px_#00000040] font-semibold leading-[normal]">
              Saving for Earning
            </div>
          </div>
          <Setting className="!absolute !left-16 !top-[704px]" settingFill={settingSettingFill} stateProp="default" />
        </>
      )}

      {state === "setting" && (
        <div className="relative w-[309px] h-[1080px]">
          <img className="absolute w-[286px] h-[1080px] top-0 left-0" alt="Menu" src="/img/menu-3.svg" />
          <Transaction className="!absolute !left-16 !top-[527px]" stateProp="default" />
          <Report
            className="!h-[29px] !shadow-[0px_3.65px_2.28px_#00000040] !absolute !left-[67px] !w-[175px] !top-[616px]"
            img="/img/subtract-10.svg"
            reportClassName="!text-[19.8px] ![white-space:unset] !left-9 !w-[139px]"
            stateProp="default"
            subtractClassName="!h-[29px] !w-[23px]"
          />
          <Dashboard className="!absolute !left-[60px] !top-[435px]" stateProp="default" />
          <div className="absolute w-[173px] h-[250px] top-[61px] left-[57px]">
            <div className="absolute w-[159px] h-52 -top-px -left-0.5">
              <div className="absolute w-[135px] top-[168px] left-[15px] [text-shadow:0px_4.27px_2.67px_#00000040] [font-family:'Inter',Helvetica] font-extrabold text-background text-[33px] tracking-[0] leading-[normal] whitespace-nowrap">
                SE Bank
              </div>
              <img
                className="absolute w-[159px] h-[170px] top-0 left-0 object-cover"
                alt="Logo"
                src="/img/logo-3.png"
              />
            </div>
            <div className="absolute w-[169px] top-[214px] left-0 [text-shadow:0px_5.32px_3.32px_#00000040] opacity-80 [font-family:'Inter',Helvetica] font-semibold text-background text-[19px] tracking-[0] leading-[normal]">
              Saving for Earning
            </div>
          </div>
          <Setting
            className="!h-11 !absolute !left-[76px] !w-[233px] !top-[696px]"
            divClassName="!text-[25.9px] !left-[55px] !w-[178px] !top-[5px]"
            settingFillSettingFillClassName="!h-[43px] !absolute !left-[-3px] !w-[43px] !top-0"
            settingFillSubtract="/img/subtract-12.svg"
            settingFillSubtractClassName="!h-9 !left-1 !w-9 !top-1"
            stateProp="selected"
          />
        </div>
      )}
    </div>
  );
};

MenuAsset.propTypes = {
  state: PropTypes.oneOf(["dashboard", "report", "setting", "transactions"]),
  dashboardChartFill: PropTypes.string,
  logo: PropTypes.string,
  settingSettingFill: PropTypes.string,
};
