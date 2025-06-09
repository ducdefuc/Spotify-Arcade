// src/middleware/errorHandler.js

/**
 * Error handler middleware.
 *
 * @param {Error} error - The error object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const errorHandler = (error, req, res, next) => {
  console.error(error)
  const statusCode = error.status || 500
  res.status(statusCode)

  if (process.env.NODE_ENV === 'production') {
    res.render('errors/error', {
      message: error.message,
      stack: null,
      statusCode
    })
  } else {
    res.render('errors/error', {
      message: error.message,
      stack: error.stack,
      statusCode
    })
  }
}
