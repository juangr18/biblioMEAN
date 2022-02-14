import user from "../models/user.js";
import role from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (
    !req.body.id_document ||
    !req.body.name ||
    !req.body.last ||
    !req.body.email ||
    !req.body.password
  )
    return res.status(400).send({ menssage: "Incomplete data" });
  const existingUser = await user.findOne({
    id_document: req.body.id_document,
  });
  if (existingUser)
    return res
      .status(500)
      .send({ menssage: "The user already exist to database." });
  const pwdHash = await bcrypt.hash(req.body.password, 10);
  const roleId = await role.findOne({ name: "user" });
  if (!roleId)
    return res.status(400).send({ menssage: "No role was assigned." });
  let schema = new user({
    id_document: req.body.id_document,
    name: req.body.name,
    last: req.body.last,
    email: req.body.email,
    password: pwdHash,
    role: roleId._id,
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

export default { registerUser };
