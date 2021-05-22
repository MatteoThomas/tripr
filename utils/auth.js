const withAuth = (req, res, next) => {
<<<<<<< HEAD

=======
>>>>>>> f0f21e2f9cb79429f6206a955bea717f4a28d905
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;