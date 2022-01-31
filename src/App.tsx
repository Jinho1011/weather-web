import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";
import { getCoords, currentApi, oncallApi, getCurrentColor } from "./api";
import { State } from "./interfaces/interface";
import { CurrentWeather } from "./interfaces/current";
import { Forecast } from "./interfaces/forecast";

import Header from "./modules/header";
import Today from "./modules/today";
import Week from "./modules/week";

const LightenDarkenColor = (col: string, amt: number) => {
  var num = parseInt(col.substring(1), 16);
  var r = (num >> 16) + amt;
  var b = ((num >> 8) & 0x00ff) + amt;
  var g = (num & 0x0000ff) + amt;
  var newColor = g | (b << 8) | (r << 16);
  return newColor.toString(16);
};

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
            background-color: #${LightenDarkenColor(state.backgroundColor, -7)};
          `}
        >
          <Header state={state} />
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
