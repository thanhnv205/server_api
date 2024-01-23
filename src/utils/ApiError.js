class ApiError extends Error {
  // khởi tạo class
  constructor(statusCode, message) {
    super(message);

    this.name = "ApiError";

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.contructor);
  }
}

export default ApiError;
