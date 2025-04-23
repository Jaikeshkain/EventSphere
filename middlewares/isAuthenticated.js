const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/auth/login")
}

module.exports = isAuthenticated;
