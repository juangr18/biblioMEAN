import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.last || !req.body.password)
    return res.status(400).send({ menssage: "Incomplete data" });
  const pwdHash = await bcrypt.hash(req.body.password, 10);
  let schema = new user({
    name: req.body.name,
    last: req.body.last,
    email: req.body.email,
    password: pwdHash,
    role: req.body.role,
    dbStatus: true,
  });
  const result = await schema.save();
  if (!result) return res.status(500).send({ menssage: "Failed to Register." });
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
    return res.status(500).send({ menssage: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(400).send({ menssage: "No search results" });
  return res.status(200).send({ users });
};

export default { registerUser, listUser };
