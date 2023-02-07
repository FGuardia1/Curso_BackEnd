const Authenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return res.send("No autorizado");
  next();
};
export default Authenticated;
