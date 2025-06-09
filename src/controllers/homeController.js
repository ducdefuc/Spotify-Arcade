// src/controllers/homeController.js

/**
 * Controller for home.
 */
export class HomeController {
  /**
   * Method to render home view.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    const user = req.session.user
    res.render('home', { isAuthenticated: res.locals.isAuthenticated, user })
  }
}
