// src/middleware/accessHandler.js

/**
 * Middleware to check if user is authenticated. Used for protecting routes that require authentication.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const checkAccessToken = (req, res, next) => {
  if (!req.session.accessToken) {
    const error = new Error('Unauthorized, make sure you are logged in')
    error.status = 401
    next(error)
  } else {
    next()
  }
}

/**
 * Middleware to set authentication status in res.locals, in order to use it to modify view rendering.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const setAuthenticationStatus = (req, res, next) => {
  res.locals.isAuthenticated = Boolean(req.session.accessToken)
  next()
}
