module.exports = {
  requireLogin(req, res, next) {
    const { user } = req.session
    if (!user) {
      return res.redirect("/login")
    }

    next()
  },

  redirectHome(req, res, next) {
    const { user } = req.session
    if (user) {
      return res.redirect("/")
    }

    next()
  }
}
