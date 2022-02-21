import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.last || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });
  const pwdHash = await bcrypt.hash(req.body.password, 10);
  let schema = new user({
    id_document: req.body.id_document,
    name: req.body.name,
    last: req.body.last,
    email: req.body.email,
    password: pwdHash,
    role: req.body.role,
    dbStatus: true,
  });
  const result = await schema.save();
  if (!result) return res.status(500).send({ message: "Failed to Register." });
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result.id,
          name: result.name,
          last: result.last,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(400).send({ message: "No search results" });
  return res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
  const msgError = "Wrong email or password.";
  if (!userLogin || !userLogin.dbStatus)
    return res.status(400).send({ message: msgError });
  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash) return res.status(400).send({ message: msgError });
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin.id,
          name: userLogin.name,
          last: userLogin.last,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });
  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(500).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

const updateUser = async (req, res) => {
  if (
    !req.body._id ||
    !req.body.id_document ||
    !req.body.name ||
    !req.body.last ||
    !req.body.email ||
    !req.body.role
  )
    return res.status(400).send({ message: "Incomplete data." });
  let pass = "";
  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }
  const userEdit = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    last: req.body.last,
    role: req.body.role,
  });
  return userEdit
    ? res.status(200).send({ message: "Edited user successful." })
    : res.status(500).send({ message: "Error editing user." });
};

export default { registerUser, listUser, login, deleteUser, updateUser };
