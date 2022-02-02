import React, { useState, useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { StateProps } from "../interfaces/interface";
import { Hourly } from "../interfaces/forecast";
import Box from "../components/Box";
import ProgressBar from "../components/ProgressBar";

const UviContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Content = ({ state }: StateProps) => {
  const uviValue: number = Math.round(state.forecast.hourly[0].uvi);
  let uviLevel: string = "";
  let uviDesc: string = "";
  if (uviValue >= 11) {
    uviLevel = "위험";
    uviDesc = "가능한 한 실내활동 권장";
  } else if (uviValue >= 8) {
    uviLevel = "매우 높음";
    uviDesc = "한낮에는 외출자제 권장";
  } else if (uviValue >= 6) {
    uviLevel = "높음";
    uviDesc = "긴소매옷과 양산, 자외선 차단제 권장";
  } else if (uviValue >= 3) {
    uviLevel = "보통";
    uviDesc = "모자, 선글라스 사용 권장";
  } else {
    uviLevel = "낮음";
    uviDesc = "피부가 예민하다면 자외선 차단제 권장";
  }
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <span
        className={css`
          font-family: "Noto Sans KR", sans-serif;
          color: #ffffff;
          font-weight: 500;
          font-size: 16px;
          padding-bottom: 2px;
        `}
      >
        {uviValue}
      </span>
      <span
        className={css`
          font-family: "Noto Sans KR", sans-serif;
          color: #ffffff;
          font-weight: 500;
          font-size: 16px;
          padding-bottom: 10px;
        `}
      >
        {uviLevel}
      </span>
      <ProgressBar
        range={[1, 12]}
        min={1}
        max={12}
        width={100}
        current={uviValue}
        gradientColors={["#69CE65", "#F3D74A", "#EB515C", "#B45FE6"]}
        backgroundColor={state.backgroundColor}
      />
      <span
        className={css`
          padding-top: 10px;
          font-family: "Noto Sans KR", sans-serif;
          color: #ffffff;
          font-weight: 300;
          font-size: 10px;
          width: 80px;
          line-height: 12px;
        `}
      >
        {uviDesc}
      </span>
    </div>
  );
};

const Today = ({ state }: StateProps) => {
  return (
    <UviContainer>
      <Box
        state={state}
        icon={<FaSun />}
        title={"자외선 지수"}
        content={<Content state={state} />}
      />
    </UviContainer>
  );
};

export default Today;
