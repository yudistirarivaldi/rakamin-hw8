const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      // masukan di header token : token yang di dapat ketika login

      var bearerToken = req.headers['authorization']
      token = bearerToken.split(' ')[1]

      console.log(token);

      const decoded = jwt.verify(token, "secretketjwt");
      if (decoded) {
        req.user = decoded.user;
        next();
      }
    } catch (err) {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  },
};
