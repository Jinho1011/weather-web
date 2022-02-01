import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { StateProps } from "../interfaces/interface";
import { Daily } from "../interfaces/forecast";

import Box from "../components/Box";
import ProgressBar from "../components/ProgressBar";

const WeekContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const getDayName = (daytime: number, index: number): string => {
  if (index === 0) {
    return "오늘";
  } else {
    const d = new Date(0);
    d.setUTCSeconds(daytime);
    const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
    return WEEKDAY[d.getDay()];
  }
};

const Content = ({ state }: StateProps) => {
  const maxDay = 10;
  const [weekMinTemp, setWeekMinTemp] = useState<number>(0);
  const [weekMaxTemp, setWeekMaxTemp] = useState<number>(0);

  useEffect(() => {
    const maxTemps = state.forecast.daily
      .slice(0, maxDay)
      .map((weather: Daily) => {
        return weather.temp.max;
      });
    const minTemps = state.forecast.daily
      .slice(0, maxDay)
      .map((weather: Daily) => {
        return weather.temp.min;
      });
    setWeekMaxTemp(Math.trunc(Math.max(...maxTemps)));
    setWeekMinTemp(Math.trunc(Math.min(...minTemps)));
  }, []);

  return (
    <>
      {state.forecast.daily
        .slice(0, maxDay)
        .map((weather: Daily, index: number) => {
          const weekStr = getDayName(weather.dt, index);
          const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
          const minTemp = Math.trunc(weather.temp.min);
          const maxTemp = Math.trunc(weather.temp.max);

          return (
            <div
              key={weather.dt}
              className={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <span
                className={css`
                  font-family: "Noto Sans KR", sans-serif;
                  color: #ffffff;
                  font-weight: 500;
                  font-size: 12px;
                  width: 30px;
                `}
              >
                {weekStr}
              </span>
              <img
                src={icon}
                className={css`
                  width: 40px;
                  height: 40px;
                `}
              />
              <span
                className={css`
                  font-family: "Noto Sans KR", sans-serif;
                  color: #ffffff;
                  font-weight: 500;
                  font-size: 12px;
                `}
              >
                {minTemp}
              </span>
              {index === 0 ? (
                <ProgressBar
                  range={[weekMinTemp, weekMaxTemp]}
                  min={minTemp}
                  max={maxTemp}
                  current={Math.trunc(state.currentWeather.main.temp)}
                  width={80}
                />
              ) : (
                <ProgressBar
                  range={[weekMinTemp, weekMaxTemp]}
                  min={minTemp}
                  max={maxTemp}
                  width={80}
                />
              )}
              <span
                className={css`
                  font-family: "Noto Sans KR", sans-serif;
                  color: #ffffff;
                  font-weight: 500;
                  font-size: 12px;
                `}
              >
                {maxTemp}
              </span>
            </div>
          );
        })}
    </>
  );
};

const Week = ({ state }: StateProps) => {
  return (
    <WeekContainer>
      <Box
        state={state}
        icon={<FaRegCalendarAlt />}
        title={"10일간의 일기예보"}
        content={<Content state={state} />}
      />
    </WeekContainer>
  );
};

export default Week;
