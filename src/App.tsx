import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";

import { getCoords, currentApi, oncallApi, getCurrentColor } from "./api";
import { State } from "./interfaces/interface";
import { CurrentWeather } from "./interfaces/current";
import { Forecast } from "./interfaces/forecast";

import Header from "./modules/header";
import Today from "./modules/today";
import Week from "./modules/week";
import Uvi from "./modules/uvi";

const BoxContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  gap: 10px;
`;

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    isReady: false,
    currentWeather: {} as CurrentWeather,
    forecast: {} as Forecast,
    backgroundColor: getCurrentColor(),
  });

  useEffect(() => {
    const init = async () => {
      const coord = await getCoords();

      const currentWeatherApi = new currentApi(coord);
      const forecastApi = new oncallApi(coord);

      const currentWeather = await currentWeatherApi.getData();
      const forecast = await forecastApi.getData();

      setState((prev: any) => ({
        ...prev,
        currentWeather,
        forecast,
        isReady: true,
      }));
    };
    init();

    const interval = setInterval(() => {
      init();
      setState((prev: any) => ({
        ...prev,
        backgroundColor: getCurrentColor(),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: App.tsx ~ line 21 ~ state", state);
  }, [state]);

  return (
    <>
      {state.isReady ? (
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: ${state.backgroundColor};
          `}
        >
          <Header state={state} />
          <Today state={state} />
          <Week state={state} />
          <BoxContainer>
            <Uvi state={state} />
            <Uvi state={state} />
          </BoxContainer>
        </div>
      ) : (
        "Ready"
      )}
    </>
  );
};

export default App;
