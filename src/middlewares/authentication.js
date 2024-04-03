const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const user = req.session.user;
  if (user) {
    req.user = user;
    const encrypted = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("_secure", encrypted, {
      httpOnly: true,
      secure: true,
    });
    return next();
  }
  return res.redirect("/login");
};

module.exports = isAuthenticated;
