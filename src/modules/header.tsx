import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import { State } from "../interfaces/interface";

interface HeaderProps {
  state: State;
}

const Header = ({ state }: HeaderProps) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        padding-top: 120px;
        padding-bottom: 100px;
      `}
    >
      <span
        className={css`
          font-family: "Noto Sans KR", sans-serif;
          color: #ffffff;
          font-weight: 300;
          font-size: 64px;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.1),
            0 3px 6px rgba(0, 0, 0, 0.2);
        `}
      >
        {state.currentWeather.name}
      </span>
      <span
        className={css`
          font-family: "Noto Sans KR", sans-serif;
          color: #ffffff;
          font-weight: 100;
          font-size: 92px;
          display: flex;
          justify-content: center;
          padding-left: 30px;
          padding-top: 18px;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        `}
      >
        {Math.trunc(state.currentWeather.main.temp)}°
      </span>
      <span
        className={css`
          font-family: "Noto Sans KR", sans-serif;
          color: #ffffff;
          font-weight: 400;
          font-size: 24px;
          display: flex;
          justify-content: center;
          padding-top: 18px;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        `}
      >
        {state.currentWeather.weather[0].description}
      </span>
      <div></div>
    </div>
  );
};

export default Header;
