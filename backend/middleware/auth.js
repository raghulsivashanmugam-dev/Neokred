const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  token = bearerHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    console.log("token", token)
    const decoded = jwt.verify(token, "secret");
    console.log("decoded.user", decoded)
    req.user = decoded.user;
    next();
  } catch (e) {
    console.log("error", e.message)
    res.status(401).send({ message: "Invalid Token" });
  }
};