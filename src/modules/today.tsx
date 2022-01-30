import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";
import { State, Hourly } from "../interfaces/interface";

interface RemainProps {
  state: State;
}

const Today = ({ state }: RemainProps) => {
  const LightenDarkenColor = (col: string, amt: number) => {
    var num = parseInt(col.substring(1), 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00ff) + amt;
    var g = (num & 0x0000ff) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
  };

  const TodayContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
  `;

  const BoxContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 16px 0 16px 16px;
    border-radius: 20px;
    background-color: #${LightenDarkenColor(state.backgroundColor, -16)};
  `;

  const BoxTitle = styled.span`
    font-family: "Noto Sans KR", sans-serif;
    color: #${LightenDarkenColor(state.backgroundColor, 16)};
    font-weight: 500;
    font-size: 14px;
  `;

  const BoxDivider = styled.div`
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #${LightenDarkenColor(state.backgroundColor, 16)};
  `;

  const BoxContentContainer = styled.div`
    padding-top: 20px;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    gap: 28px;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <TodayContainer>
      <BoxContainer>
        <BoxTitle>시간별 일기예보</BoxTitle>
        <BoxDivider />
        <BoxContentContainer>
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
                  key={index}
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
                      color: #${LightenDarkenColor(state.backgroundColor, 30)};
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
                      color: #${LightenDarkenColor(state.backgroundColor, 30)};
                      font-weight: 700;
                      font-size: 14px;
                    `}
                  >
                    {Math.trunc(weather.temp)}°
                  </span>
                </div>
              );
            })}
        </BoxContentContainer>
      </BoxContainer>
    </TodayContainer>
  );
};

export default Today;
