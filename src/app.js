import express, { json } from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import truckRoutes from './routes/truck.routes'
import cityRoutes from './routes/city.routes'
import travelRoutes from './routes/travel.routes'

import {
  errorLogger,
  errorResponder,
  invalidPathHandler
} from './middlewares/errors.middleware'
import cors from './middlewares/cors.middleware'

//initialization
const app = express()

//middleware
app.use(morgan('dev'))
app.use(json())

//corss
app.use(cors)

//routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/trucks', truckRoutes)
app.use('/api/cities', cityRoutes)
app.use('/api/travels', travelRoutes)

//middleware errors
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

export default app
