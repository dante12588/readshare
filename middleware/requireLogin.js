module.exports = function requireLogin(req, res, next) {
  if (!req.session.userId) {
      req.session.returnTo = req.originalUrl; // zapisz oryginalny URL
      res.redirect('/login');
  } else {
      next();
  }
}