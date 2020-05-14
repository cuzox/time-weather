import axios from 'axios'


interface OpenWeatherCurrentWeatherResponse {
    main: {
      temp: number
    }
    sys: {
      country: string
    }
    timezone: number
    weather: {
      description: string
    }[]
  }

const openWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather'
const opwnWeatherAPIKey = process.env.OPEN_WEATHER_API_KEY

export async function getWeatherForLocation(location: string): Promise<OpenWeatherCurrentWeatherResponse>{
  const response = await axios.get(openWeatherEndpoint, {
    params: {
      q: location,
      units: 'imperial',
      appid: opwnWeatherAPIKey
    }
  })

  return response.data
}
