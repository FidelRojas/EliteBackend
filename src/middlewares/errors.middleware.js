export const errorLogger = (error, request, response, next) => {
  console.log(`${new Date().toUTCString()} Error: "${error.message || error}"`)
  next(error)
}

export const errorResponder = (error, request, response, next) => {
  response.header('Content-Type', 'application/json')
  const status = error.status || 500
  response.status(status).json({
    message: error.message || error
  })
}

export const invalidPathHandler = (request, response, next) => {
  response.status(404).json({ message: `Invalid path: ${request.method} ${request.path}` })
}
