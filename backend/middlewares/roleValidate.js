import role from "../models/role.js";

const existRole = async (req, res, next) => {
  const roleId = await role.findOne({ name: "user" });
  if (!roleId)
    return res.status(400).send({ menssage: "No role was assigned." });
  req.body.role = roleId._id;

  next();
};

export default { existRole };
