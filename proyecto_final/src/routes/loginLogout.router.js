import express from "express";
const routerLogInOut = express.Router();
import passport from "passport";
import multer from "multer";
import { carritoDAO } from "../daos/index.js";
import { enviarMailRegistro } from "../services/sendEmail.js";

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: myStorage });

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
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.render("logout");
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
  upload.single("myFile"),
  passport.authenticate("register", { failureRedirect: "/login/failregister" }),
  async (req, res) => {
    let userId = req.session.passport.user;

    let timestamp = new Date().toLocaleString();
    let productos = [];
    let newCartId = await carritoDAO.create({ timestamp, productos, userId });

    enviarMailRegistro(req.body);

    res.redirect("/home");
  }
);

export default routerLogInOut;
