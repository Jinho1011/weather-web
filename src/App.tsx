import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import { getCoords, getWeather, getOneCall, getCurrentColor } from "./api";
import { State } from "./interfaces/interface";

import Header from "./modules/header";
import Today from "./modules/today";
import Week from "./modules/week";

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    isReady: false,
    currentWeather: {},
    forecast: {},
    backgroundColor: getCurrentColor(),
  });

  useEffect(() => {
    const init = async () => {
      const coord = await getCoords();
      const currentWeather = await getWeather(coord.lat, coord.lng);
      const forecast = await getOneCall(coord.lat, coord.lng);
      setState((prev: any) => ({
        ...prev,
        currentWeather,
        forecast,
        isReady: true,
      }));
    };
    const interval = setInterval(() => {
      setState((prev: any) => ({
        ...prev,
        backgroundColor: getCurrentColor(),
      }));
    }, 60000);
    init();

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
          <Today state={state} />
          <Week state={state} />
        </div>
      ) : (
        "Ready"
      )}
    </>
  );
};

export default App;
