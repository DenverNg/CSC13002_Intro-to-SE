import React from "react";
import { ChNLoIS } from "../../components/ChNLoIS";
import { InBOCO } from "../../components/InBOCO";
import { KhungNhPThNgBO } from "../../components/KhungNhPThNgBO";
import { MenuAsset } from "../../components/MenuAsset";
import { TIBOCO } from "../../components/TIBOCO";
import { ExpandRight } from "../../icons/ExpandRight";
import { ExpandRight1 } from "../../icons/ExpandRight1";
import { ExpandRightDouble } from "../../icons/ExpandRightDouble";
import { ExpandRightDouble1 } from "../../icons/ExpandRightDouble1";
import { Import3 } from "../../icons/Import3";

export const ReportFrameMonthly = () => {
  return (
    <div className="bg-[#edecff] flex flex-row justify-center w-full">
      <div className="bg-[#edecff] w-[1920px] h-[1080px] relative">
        <MenuAsset
          className="!absolute bg-[url(/static/img/menu-4.svg)] !left-0 !top-0"
          dashboardChartFill="/img/chart-fill-2.svg"
          logo="/img/logo-1.png"
          settingSettingFill="/img/setting-fill-2.svg"
          state="report"
        />
        <p className="absolute top-[167px] left-[809px] [font-family:'Inter',Helvetica] font-black text-text text-[55.5px] tracking-[0] leading-[normal]">
          Báo Cáo Mở/Đóng Sổ Tháng
        </p>
        <div className="absolute top-[60px] left-[391px] opacity-[0.41] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[40px] tracking-[0] leading-[48.4px] whitespace-nowrap">
          Báo cáo doanh số
        </div>
        <p className="absolute top-[60px] left-[791px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-[40px] tracking-[0] leading-[48.4px] whitespace-nowrap">
          Báo cáo đóng mở sổ
        </p>
        <div className="absolute w-[437px] h-2 top-[115px] left-[774px] rounded-[51px] [background:linear-gradient(180deg,rgb(112,101,210)_0%,rgb(164.92,79.2,205.26)_100%)]" />
        <div className="absolute w-[1471px] h-[794px] top-[245px] left-[360px]">
          <KhungNhPThNgBO
            className="!h-[68px] !absolute !left-1 !w-[368px] !top-0.5"
            divClassName="!text-[26.7px] !left-[123px] !w-[122px] !top-6"
            divClassNameOverride="!text-[16.2px] !left-6 !leading-[19.6px] !w-[117px]"
            overlapGroupClassName="!h-[68px]"
            property1="default"
            rectangleClassName="!h-14 !rounded-[11.15px] !border-[0.7px] !border-solid !w-[368px] !top-3"
            rectangleClassNameOverride="!h-[25px] !blur-[7.74px] !left-[15px] !w-[123px]"
          />
          <div className="absolute w-[1471px] h-[780px] top-3.5 left-0">
            <div className="absolute w-[1463px] h-[669px] top-[111px] left-1 bg-white rounded-[25.07px] shadow-[0px_3.86px_35.78px_-18px_#7065d2,inset_0px_4px_4px_#00000040]" />
            <img
              className="absolute w-[1471px] h-[97px] top-[111px] left-0"
              alt="Rectangle"
              src="/img/rectangle-4235.svg"
            />
            <div className="absolute w-[1463px] h-[69px] top-[199px] left-1 bg-white border border-solid border-[#9084ff75]" />
            <div className="absolute top-[135px] left-[63px] [font-family:'Inter',Helvetica] font-medium text-white text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
              STT
            </div>
            <div className="absolute top-[135px] left-[308px] [font-family:'Inter',Helvetica] font-medium text-white text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
              Ngày
            </div>
            <div className="left-[633px] absolute top-[134px] [font-family:'Inter',Helvetica] font-medium text-white text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
              Sổ mở
            </div>
            <div className="left-[897px] absolute top-[134px] [font-family:'Inter',Helvetica] font-medium text-white text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
              Sổ đóng
            </div>
            <div className="absolute top-[134px] left-[1190px] [font-family:'Inter',Helvetica] font-medium text-white text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
              Chênh lệch
            </div>
            <ChNLoIS
              className="!h-[232px] !absolute !left-[426px] !w-[370px] !top-0"
              divClassName="!text-[19.2px] !left-4 !leading-[23.2px] !w-[202px] !top-[15px]"
              overlapGroupClassName="!h-[57px] !rounded-[11.17px] !border-[0.7px] !border-solid !left-px !w-[369px]"
              property1="kh-ng-k-h-n"
              vector="/img/vector-246-6.svg"
              vectorClassName="!h-[11px] !left-[333px] !w-5 !top-[22px]"
            />
            <div className="absolute w-[1217px] h-9 top-[217px] left-[79px]">
              <div className="absolute top-0 left-[866px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                3
              </div>
              <div className="top-0 left-[584px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                22
              </div>
              <div className="absolute top-0 left-[211px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                01/06/2024
              </div>
              <div className="top-[5px] left-0 font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                1
              </div>
              <div className="top-0 left-[1177px] font-bold text-[#059436] absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                19
              </div>
            </div>
            <div className="absolute w-[1463px] h-[69px] top-[593px] left-1 bg-white border border-solid border-[#9084ff75]" />
            <div className="w-[1217px] h-9 top-[611px] absolute left-[79px]">
              <div className="absolute top-0 left-[866px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                3
              </div>
              <div className="top-0 left-[584px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                22
              </div>
              <div className="absolute top-0 left-[211px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                07/06/2024
              </div>
              <div className="top-[5px] left-0 font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                7
              </div>
              <div className="top-0 left-[1177px] font-bold text-[#059436] absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                19
              </div>
            </div>
            <div className="absolute w-[1463px] h-[69px] top-[533px] left-1 bg-white border border-solid border-[#9084ff75]" />
            <div className="w-[1220px] h-[37px] top-[550px] absolute left-[79px]">
              <div className="top-0 left-[861px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                23
              </div>
              <div className="top-px left-[591px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                1
              </div>
              <div className="absolute top-px left-[211px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                06/06/2024
              </div>
              <div className="top-1.5 left-0 font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                6
              </div>
              <div className="top-px left-[1177px] font-bold text-[#c4455f] absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                22
              </div>
            </div>
            <div className="absolute w-[1463px] h-[69px] top-[467px] left-1 bg-white border border-solid border-[#9084ff75]" />
            <div className="w-[1221px] h-[37px] top-[484px] absolute left-[79px]">
              <div className="top-0 left-[861px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                12
              </div>
              <div className="top-px left-[584px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                44
              </div>
              <div className="absolute top-px left-[211px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                05/06/2024
              </div>
              <div className="top-1.5 left-0 font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                5
              </div>
              <div className="top-px left-[1177px] font-bold text-[#059436] absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                32
              </div>
            </div>
            <div className="absolute w-[1463px] h-[69px] top-[403px] left-1 bg-white border border-solid border-[#9084ff75]" />
            <div className="w-[1210px] h-[37px] top-[420px] absolute left-[79px]">
              <div className="top-0 left-[870px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                2
              </div>
              <div className="top-px left-[591px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                3
              </div>
              <div className="absolute top-px left-[211px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                04/06/2024
              </div>
              <div className="top-1.5 left-0 font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                4
              </div>
              <div className="top-px left-[1187px] font-bold text-[#059436] absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                1
              </div>
            </div>
            <div className="absolute w-[1463px] h-[69px] top-[337px] left-1 bg-white border border-solid border-[#9084ff75]" />
            <div className="w-[1218px] h-[37px] top-[354px] absolute left-[79px]">
              <div className="top-0 left-[861px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                33
              </div>
              <div className="top-px left-[584px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                23
              </div>
              <div className="absolute top-px left-[211px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                03/06/2024
              </div>
              <div className="top-1.5 left-0 font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                3
              </div>
              <div className="top-px left-[1177px] font-bold text-[#c4455f] absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                10
              </div>
            </div>
            <div className="absolute w-[1463px] h-[69px] top-[268px] left-1 bg-white border border-solid border-[#9084ff75]" />
            <div className="w-[1213px] h-[37px] top-[285px] absolute left-[79px]">
              <div className="top-0 left-[861px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                12
              </div>
              <div className="top-px left-[584px] font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                12
              </div>
              <div className="absolute top-px left-[211px] [font-family:'Inter',Helvetica] font-normal text-text text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                02/06/2024
              </div>
              <div className="top-1.5 left-0 font-normal text-text absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                2
              </div>
              <div className="top-px left-[1185px] font-bold text-[#382b46] absolute [font-family:'Inter',Helvetica] text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
                0
              </div>
            </div>
            <div className="absolute w-[133px] top-[718px] left-[678px] [font-family:'Inter',Helvetica] font-medium text-[#7065d2] text-[25.4px] tracking-[0] leading-[30.7px] whitespace-nowrap">
              Trang 1 / 2
            </div>
            <ExpandRight className="!absolute !w-12 !h-12 !top-[711px] !left-[858px]" />
            <ExpandRightDouble className="!absolute !w-12 !h-12 !top-[711px] !left-[932px]" />
            <ExpandRightDouble1 className="!absolute !w-12 !h-12 !top-[711px] !left-[511px]" />
            <ExpandRight1 className="!absolute !w-12 !h-12 !top-[711px] !left-[574px]" />
          </div>
          <InBOCO
            className="!h-[81px] !absolute !left-[1335px] !w-[108px] !top-1.5"
            divClassName="!text-[20.3px] !w-[108px] !top-14"
            img="/img/rectangle-4134-2.svg"
            imgClassName="!h-[5px] !left-11 !w-[18px] !top-[42px]"
            overlapGroupClassName="!left-[-7px] !h-[77px]"
            property1="default"
            rectangle="/img/rectangle-4117-2.svg"
            rectangleClassName="!h-[26px] !left-[23px] !w-[58px] !top-3"
            rectangleClassNameOverride="!h-3.5 !left-8 !w-10"
            vector="/img/vector-57-2.svg"
            vector1="/img/vector-56-2.svg"
            vector2="/img/vector-58-2.svg"
            vectorClassName="!h-[37px] !left-8 !w-10 !top-[21px]"
            vectorClassNameOverride="!h-[5px] !left-11 !w-3.5 !top-[33px]"
          />
          <TIBOCO
            className="!h-[88px] !absolute !left-[1100px] !w-[111px] !top-0"
            divClassName="!text-[20.1px] !w-[111px] !top-[66px]"
            icon={<Import3 className="!absolute !w-[71px] !h-[71px] !top-0 !left-[19px]" />}
            overlapGroupClassName="!h-[87px]"
            property1="default"
          />
        </div>
      </div>
    </div>
  );
};
