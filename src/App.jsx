import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiKey = '96c2fb9bd1fe3e1f9f944587dbdfe4f5'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  const fetchWeather = async () => {
    if (!city.trim()) return
    
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(apiUrl)
      setWeather(response.data)
    } catch (error) {
      setError('City not found. Please try again.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather()
    }
  }

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && (
        <div className="loading">Loading weather information...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {weather && !loading && !error && (
        <div className="weather-details">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="description">{weather.weather[0].description}</p>
          <p className="details">
            Humidity: {weather.main.humidity}% | 
            Wind: {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  )
}

export default App

