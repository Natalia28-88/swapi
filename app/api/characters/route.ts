const BASE_URL = 'https://swapi.dev/api';

// Получение списка героев
export async function getPeople(page: number = 1) {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error(`Error fetching people: ${response.statusText}`);
  }
  return response.json();
}

// Получение информации о конкретном персонаже
export async function getPerson(id: string) {
  const response = await fetch(`${BASE_URL}/people/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching person: ${response.statusText}`);
  }
  return response.json();
}
