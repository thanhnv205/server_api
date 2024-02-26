class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)

    this.name = 'ApiError'

    this.statusCode = statusCode

    Error.captureStackTrace(this, this.contructor)
  }
}

export default ApiError
