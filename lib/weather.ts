import type { DailyForecastItem, WeatherResponse } from "@/types/weather";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchCurrentWeather(
  lat: number,
  lon: number,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,relative_humidity_2m,weather_code",
    timezone: "Asia/Seoul",
  });

  const res = await fetch(`${BASE_URL}?${params}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("현재 날씨를 불러오지 못했습니다.");
  }

  return res.json();
}

export async function fetchWeatherDetail(
  lat: number,
  lon: number,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,relative_humidity_2m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "Asia/Seoul",
  });

  const res = await fetch(`${BASE_URL}?${params}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("날씨 정보를 불러오지 못했습니다.");
  }

  return res.json();
}

export function parseDailyForecast(
  daily: NonNullable<WeatherResponse["daily"]>,
): DailyForecastItem[] {
  return daily.time.map((date, index) => ({
    date,
    maxTemp: daily.temperature_2m_max[index],
    minTemp: daily.temperature_2m_min[index],
    weatherCode: daily.weather_code[index],
  }));
}

export function formatDateTime(isoString: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Seoul",
  }).format(new Date(isoString));
}

export function formatShortDate(isoString: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Seoul",
  }).format(new Date(isoString));
}
