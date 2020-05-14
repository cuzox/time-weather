require('dotenv').config()

import Utils from './utils';
import App from './app'


const rawLocations = process.argv.slice(2)
const locations = Utils.parseLocations(rawLocations)

App.run(locations)
