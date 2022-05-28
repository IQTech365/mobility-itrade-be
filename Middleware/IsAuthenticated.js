const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("auth");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ status: "token Invalid", msg: "Invalid token" });
  }
};
