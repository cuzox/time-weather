import { DateTime } from 'luxon'

import { flow, filter, flatMap, map, curry } from 'lodash/fp'


export default class Utils {
  static getTimeFromUTCOffset(offsetInSeconds: number){
    return DateTime.utc().plus({ seconds: offsetInSeconds }).toLocaleString(DateTime.TIME_SIMPLE)
  }

  static parseLocations = flow(
    curry((s: string[]) => [s.join(' ')]),
    flatMap((s: string) => s.split(',')),
    map((s: string) => s.trim()),
    filter(Boolean)
  ) as (rawLocations: string[]) => string[]
}
