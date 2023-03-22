const jwt = require("jsonwebtoken");
jwtControllers = {
  createJwt: (req, res, next) => {
    const accessToken = jwt.sign(
      req.body.username,
      process.env.ACCESS_TOKEN_SECRET
    );

    const returnObj = {
      userInfo: res.locals.userinfo,
      accessToken: accessToken,
    };
    console.log("ready to send " + returnObj);
    return res.status(200).json(returnObj);
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      res.locals.user = user;
      return next();
    });
  },
};
module.exports = jwtControllers;
