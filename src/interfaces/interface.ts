import { CurrentWeather } from "./current";
import { Forecast } from "./forecast";

export interface State {
  isReady: boolean;
  currentWeather: CurrentWeather;
  forecast: Forecast;
  backgroundColor: string;
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface StateProps {
  state: State;
}
