import express, { json } from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

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

//middleware errors
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

export default app