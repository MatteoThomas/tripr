const withAuth = (req, res, next) => {
serverConnection
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

