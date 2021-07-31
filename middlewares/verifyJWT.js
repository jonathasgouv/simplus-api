const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        // Forbidden
        console.log(err);
        return res.status(403).json({ auth: false });
      }

      req.id = decoded.id;
      return next();
    });
  } else {
    // Forbidden
    return res.status(403).json({ auth: false });
  }
};

module.exports = verifyJWT;
