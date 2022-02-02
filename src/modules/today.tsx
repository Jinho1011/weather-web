import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { StateProps } from "../interfaces/interface";
import { Hourly } from "../interfaces/forecast";
import Box from "../components/TodayBox";

const TodayContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const Content = ({ state }: StateProps) => {
  return (
    <>
      {state.forecast.hourly
        .slice(0, 12)
        .map((weather: Hourly, index: number) => {
          let timeStr = "";
          let imgSrc = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

          if (index === 0) {
            timeStr = "지금";
          } else {
            const d = new Date(0);
            d.setUTCSeconds(weather.dt);
            const suffix = d.getHours() >= 12 ? "PM" : "AM";
            const hour = ((d.getHours() + 11) % 12) + 1;
            timeStr = `${hour} ${suffix}`;
          }

          return (
            <div
              key={weather.dt}
              className={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <span
                className={css`
                  font-family: "Noto Sans KR", sans-serif;
                  color: #ffffff;
                  font-weight: 500;
                  font-size: 12px;
                `}
              >
                {timeStr}
              </span>
              <img
                src={imgSrc}
                className={css`
                  width: 40px;
                  height: 40px;
                `}
              />
              <span
                className={css`
                  font-family: "Noto Sans KR", sans-serif;
                  color: #ffffff;
                  font-weight: 700;
                  font-size: 14px;
                `}
              >
                {Math.trunc(weather.temp)}°
              </span>
            </div>
          );
        })}
      <div
        className={css`
          padding-right: 6px;
        `}
      />
    </>
  );
};

const Today = ({ state }: StateProps) => {
  return (
    <TodayContainer>
      <Box
        state={state}
        icon={<FaRegClock />}
        title={"시간별 일기예보"}
        content={<Content state={state} />}
      />
    </TodayContainer>
  );
};

export default Today;
