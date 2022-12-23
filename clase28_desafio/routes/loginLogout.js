const express = require("express");
const { Router } = express;
const router = Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.redirect("/login");
});
router.get("/login", (req, res, next) => {
  res.render("view/login");
});
router.get("/register", (req, res, next) => {
  res.render("view/register");
});

router.get("/failregister", (req, res) => {
  res.render("view/register-error", {});
});
router.get("/faillogin", (req, res) => {
  res.render("view/login-error", {});
});

router.get("/logout", (req, res) => {
  const username = req.user.username;
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("view/logout", { username });
  });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    res.redirect("/home");
  }
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    res.redirect("/home");
  }
);

module.exports = router;
