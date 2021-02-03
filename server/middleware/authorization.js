const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // const jwtToken =await req.header("token")
    const userId = req.session.user_id;
    if (!userId) {
      return res.status(403).json("not authorized");
    }

    req.user = {
      id: req.session.user_id,
      role: req.session.user_role,
    };
    next();
    console.log(req.user);
  } catch (err) {
    console.log(err.message);
    return res.status(403).json("not authorized");
  }
};
