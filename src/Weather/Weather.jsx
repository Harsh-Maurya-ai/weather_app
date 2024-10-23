import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('Varanasi');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '08c985e71869421380c55018242210'; // Replace with your WeatherAPI key

  const getWeather = async (cityName) => {
    try {
        const response = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=yes`
          );
          
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found!');
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      getWeather(city);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weather && weather.location && (
        <div className="weather-info">
            <h2>{weather.location.name}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
        )}

    </div>
  );
};

export default Weather;
