import express from "express";
const routerLogInOut = express.Router();
import passport from "passport";

routerLogInOut.get("/", (req, res, next) => {
  res.render("login");
});

routerLogInOut.get("/register", (req, res, next) => {
  res.render("register");
});

routerLogInOut.get("/failregister", (req, res) => {
  res.render("register-error", {});
});
routerLogInOut.get("/faillogin", (req, res) => {
  res.render("login-error", {});
});

routerLogInOut.get("/logout", (req, res) => {
  const username = req.user.username;
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("logout", { username });
  });
});

routerLogInOut.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login/faillogin" }),
  (req, res) => {
    res.redirect("/home");
  }
);

routerLogInOut.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/login/failregister" }),
  (req, res) => {
    res.redirect("/home");
  }
);

export default routerLogInOut;
