import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ city }) => {
  const [data, setData] = useState(null)

  const dataUrl = "https://api.openweathermap.org/data/2.5/weather?"
  const iconUrl = "https://openweathermap.org/img/wn"

  const hookGetWeather = () => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY

    axios
      .get(`${dataUrl}q=${city}&appid=${api_key}`)
      .then((resp) => {
        setData(resp.data)
      })
      .catch((error) => {
        setData(null)
      })
  }

  useEffect(hookGetWeather, [])

  if (!data) return null

  return (
    <div>
      <h1>Weather in {city}</h1>
      temperature {(data.main.temp - 272.15).toFixed(2)} Celsius <br />
      <img src={`${iconUrl}/${data.weather[0].icon}@2x.png`} />
      <br />
      wind {data.wind.speed} m/s
    </div>
  )
}

export default Weather
