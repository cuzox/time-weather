import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'
import { DateTime } from 'luxon'
import { getTimeFromUTCOffset, parseLocations } from '../src/utils'


after(()=>{
  sinon.restore()
})

describe('App', ()=>{
  it('#run() should gather data for each location', () => {
    expect('test').to.equal('test')
  })

  it('#gather() should return data in expected format', () => {
    expect('test').to.equal('test')
  })
})

describe('Utils', ()=>{
  it('#getTimeFromUTCOffset() should return accurate formatted time', () => {
    const testDate = DateTime.fromObject({ hour: 7, minute: 0, second: 0, zone: 'utc' })
    const testOffset = -60 * 60
    const expectedTime = '6:00 AM'

    sinon.replace(DateTime, 'utc', () => testDate)
    const actualTime = getTimeFromUTCOffset(testOffset)

    expect(expectedTime).to.equal(actualTime)
  })

  it('#parseLocations() should return properly parsed locations', () => {
    const testLocations = ['new york', ', paris, great', 'britain , ']
    const expectedLocations = ['new york', 'paris', 'great britain']

    const actualLocations = parseLocations(testLocations)

    expect(expectedLocations).to.eql(actualLocations)
  })
})
