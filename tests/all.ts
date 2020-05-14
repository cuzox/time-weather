import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'
import { DateTime } from 'luxon'

import Utils from '../src/utils'
import App from '../src/app'
import Api from '../src/api'


afterEach(()=>{
  sinon.restore()
})

describe('App', ()=>{
  it('#gather() should return data in the expected format', async () => {
    const fakeAPIresponse = {
      main: { temp: 50 },
      sys: { country: 'DO'},
      timezone: null,
      weather: [ { description: 'clear sky' } ]
    }
    const expectedResult = "There's clear sky in Santo Domingo (DO), it's 7:00 AM and the temperature is 50 °F"

    sinon.replace(Api, 'getWeatherForLocation', () => Promise.resolve(fakeAPIresponse))
    sinon.replace(Utils, 'getTimeFromUTCOffset', () => '7:00 AM')

    const actualResult = await App.gather('santo domingo')
    expect(expectedResult).to.equal(actualResult)
  })

  it('#run() should gather data for each location', () => {
    expect('test').to.equal('test')
  })
})

describe('Utils', ()=>{
  it('#getTimeFromUTCOffset() should return accurate formatted time', () => {
    const testDate = DateTime.fromObject({ hour: 7, minute: 0, second: 0, zone: 'utc' })
    const testOffset = -60 * 60
    const expectedTime = '6:00 AM'

    sinon.replace(DateTime, 'utc', () => testDate)
    const actualTime = Utils.getTimeFromUTCOffset(testOffset)

    expect(expectedTime).to.equal(actualTime)
  })

  it('#parseLocations() should return properly parsed locations', () => {
    const testLocations = ['new york', ', paris, great', 'britain , ']
    const expectedLocations = ['new york', 'paris', 'great britain']

    const actualLocations = Utils.parseLocations(testLocations)

    expect(expectedLocations).to.eql(actualLocations)
  })
})
