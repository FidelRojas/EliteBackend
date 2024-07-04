require('dotenv').config()

const ERROR_CORS =
  'The CORS policy for this site does not allow access from the specified Origin.'
const cors = require('cors')
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',')

const corsOptions = cors({
  origin: function (origin, callback) {
    if (allowedOrigins?.indexOf(origin) === -1) {
      return callback(new Error(ERROR_CORS), false)
    }
    return callback(null, true)
  }
})

export default corsOptions
