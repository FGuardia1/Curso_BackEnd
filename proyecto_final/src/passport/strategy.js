import { User } from "../../utils/models/user.js";
import bCrypt from "bcrypt";
import path from "path";

const dirname = `${process.cwd()}`;

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};
const createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const login = (req, username, password, cb) => {
  const file = req.file;
  User.findOne({ email: username }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      console.log("User Not Found with email " + email);
      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      console.log("Invalid Password");
      return cb(null, false);
    }
    return cb(null, user);
  });
};

const register = (req, username, password, cb) => {
  const file = req.file;
  User.findOne({ email: username }, function (err, user) {
    if (err) {
      console.log("Error in SignUp: " + err);
      return cb(err);
    }
    if (user) {
      console.log("User already exists");
      return cb(null, false);
    } else {
      let path_avatar = path.join(dirname, "public", "avatar", file.filename);
      const { name, address, age, telephone } = req.body;
      const newUser = new User();
      newUser.email = username;
      newUser.password = createHash(password);
      newUser.name = name;
      newUser.address = address;
      newUser.age = age;
      newUser.telephone = telephone;
      newUser.avatar_path = path_avatar;
      newUser
        .save()
        .then((datos) => cb(null, datos))
        .catch(null, false);
    }
  });
};

export { login, register };
