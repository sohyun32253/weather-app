export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { id: "seoul", name: "서울", lat: 37.5665, lon: 126.978 },
  { id: "busan", name: "부산", lat: 35.1796, lon: 129.0756 },
  { id: "incheon", name: "인천", lat: 37.4563, lon: 126.7052 },
  { id: "daegu", name: "대구", lat: 35.8714, lon: 128.6014 },
  { id: "cheongju", name: "청주", lat: 36.6354, lon: 127.489 },
];

export function getCityById(id: string): City | undefined {
  return CITIES.find((city) => city.id === id);
}

export function searchCities(query: string, cities: City[] = CITIES): City[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return cities.filter((city) =>
    city.name.toLowerCase().includes(normalizedQuery),
  );
}
