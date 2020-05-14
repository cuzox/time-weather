import Utils from './utils'
import Api from './api'
import { startCase } from 'lodash'


export default class App {
  static locationDisplay(location: string){
    return startCase(location)
  }

  static async gather(location: string){
    const { main: {temp}, sys: {country}, timezone, weather: [{description}] } = await Api.getWeatherForLocation(location)
    const time = Utils.getTimeFromUTCOffset(timezone)

    return `There's ${description} in ${App.locationDisplay(location)} (${country}), it's ${time} and the temperature is ${temp} °F`
  }

  static async run(locations: string[]){
    for (const location of locations){
      try {
        const output = await App.gather(location)
        console.log(output)
      } catch({ response: { status } }){
        if(status === 404)
          console.log(`"${App.locationDisplay(location)}" could not be found`)
        else
          console.log(`There was an unexpected problem fetching information for "${App.locationDisplay(location)}"`)
      }
    }
  }
}
