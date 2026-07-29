export interface WeatherTheme {
    background: string;
    icon: string;
  }
  
  export function getWeatherTheme(weatherCode: number): WeatherTheme {
    // 맑음
    if (weatherCode === 0) {
      return {
        background:
          "linear-gradient(135deg,rgb(151, 207, 255) 0%,rgb(121, 183, 255) 100%)",
        icon: "☀️",
      };
    }
  
    // 구름 조금
    if ([1, 2].includes(weatherCode)) {
      return {
        background:
          "linear-gradient(135deg, #6FA8E8 0%, #8FBCE8 100%)",
        icon: "⛅",
      };
    }
  
    // 흐림
    if (weatherCode === 3) {
      return {
        background:
          "linear-gradient(135deg, #7F8EA3 0%, #AEBBC9 100%)",
        icon: "☁️",
      };
    }
  
    // 안개
    if ([45, 48].includes(weatherCode)) {
      return {
        background:
          "linear-gradient(135deg, #9AA7B4 0%, #CDD6DF 100%)",
        icon: "🌫️",
      };
    }
  
    // 비
    if ([51,53,55,56,57,61,63,65,80,81,82].includes(weatherCode)) {
      return {
        background:
          "linear-gradient(135deg, #4F7DBF 0%, #2D4F87 100%)",
        icon: "🌧️",
      };
    }
  
    // 눈
    if ([66,67,71,73,75,77,85,86].includes(weatherCode)) {
      return {
        background:
          "linear-gradient(135deg, #91B7E9 0%, #DDEAF7 100%)",
        icon: "❄️",
      };
    }
  
    // 천둥
    if ([95,96,99].includes(weatherCode)) {
      return {
        background:
          "linear-gradient(135deg, #4A4A6A 0%, #23243B 100%)",
        icon: "⛈️",
      };
    }
  
    return {
      background:
        "linear-gradient(135deg, #6CB8FF 0%, #4A90E2 100%)",
      icon: "🌤️",
    };
  }