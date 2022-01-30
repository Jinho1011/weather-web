export interface State {
  isReady: boolean;
  currentWeather: any;
  forecast: any;
  backgroundColor: string;
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface StateProps {
  state: State;
}

export interface Hourly {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
