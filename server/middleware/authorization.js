export default function authorization (req, res, next) {
  if (!req.session.user) {
    return res.status(403).json("not authorized");
  }

  next();
};
