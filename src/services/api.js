// src/services/api.js

const API_KEY = '91b940cd697ad467a34b1cc732c123aa'; // Replace with your actual API key for OpenWeatherMap
const DOG_API_KEY = 'live_oLzASZE6OBC26vglGr06nOVBYjytX0plHxo7ZRP6iuiDPdBPHMB9hY2az1tCeX1F';

export const fetchData = async (endpoint, queryParams = {}, headers = {}) => {
  try {
    const url = new URL(endpoint);
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

    console.log('Fetching data from URL:', url.toString());

    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Fetch data error:', error);
    return null; // Return null if there's an error
  }
};

// Example API configurations
export const apis = {
  weather: {
    endpoint: 'https://api.openweathermap.org/data/2.5/weather',
    queryParams: { appid: API_KEY, units: 'metric' },
    cities: ['London', 'New York', 'Tokyo', 'Delhi', 'Sydney'],
  },
  jsonPlaceholder: {
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    queryParams: {},
  },
  dogAPI: {
    endpoint: 'https://api.thedogapi.com/v1/images/search',
    queryParams: { limit: 20 },
    headers: { 'x-api-key': DOG_API_KEY },
  }
};

export const fetchWeatherForCities = async (apiConfig) => {
  const promises = apiConfig.cities.map(city =>
    fetchData(apiConfig.endpoint, { ...apiConfig.queryParams, q: city })
  );
  const weatherData = await Promise.all(promises);
  return weatherData.filter(data => data !== null); // Filter out null results
};

export const fetchDataFromApi = async (apiConfig) => {
  const data = await fetchData(apiConfig.endpoint, apiConfig.queryParams, apiConfig.headers);
  return data ? data : []; // Return data in an array for consistency
};

export const fetchDogImages = async () => {
  const data = await fetchData(apis.dogAPI.endpoint, apis.dogAPI.queryParams, apis.dogAPI.headers);
  return data ? data : [];
};
