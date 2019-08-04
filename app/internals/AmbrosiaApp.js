
import Ambrosia from './Ambrosia'
import config from "../../knexfile"
import Database from './Core/Database/Database'

// Main internal setup for the appilcation
export const AmbrosiaApp = new Ambrosia()

// Database setup

const mainDB = new Database(knexClient);


export default AmbrosiaApp

