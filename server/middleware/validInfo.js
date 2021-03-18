module.exports = function(req, res, next) {
   const {  userEmail } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![userEmail].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(userEmail)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![userEmail].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(userEmail)) {
      return res.json("Invalid Email");
    }
  }

  next();
};