export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  utc_offset_seconds: number;
  timezone: string;
  current: CurrentWeather;
  daily?: DailyForecast;
}

export interface DailyForecastItem {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}
