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

export default class Api {
  private static openWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather'
  private static openWeatherAPIKey = process.env.OPEN_WEATHER_API_KEY

  static async getWeatherForLocation(location: string): Promise<OpenWeatherCurrentWeatherResponse>{
    const response = await axios.get(Api.openWeatherEndpoint, {
      params: {
        q: location,
        units: 'imperial',
        appid: Api.openWeatherAPIKey
      }
    })

    return response.data
  }
}
