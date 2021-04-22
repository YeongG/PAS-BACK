const jwt = require("jsonwebtoken");
const { decodeJwt } = require("../lib/utils");

module.exports = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  try {
    const userData = decodeJwt(jwtToken);
    req.app.set("JWT_DATA", userData);
    next();
  } catch (err) {
    res.status(403).json({ message: "Auth Fail" });
  }
};
