import role from "../models/role.js";

const roleRegister = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ mesagge: "Incomplete data" });

  let schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  let result = await schema.save();
  if (!result)
    return res.status(500).send({ mesagge: "Failed to save on DataBase." });
  res.status(200).send({ result });
};

const listRole = async (req, res) => {
  let roles = await role.find({ name: new RegExp(req.params["name"]) });
  if (roles.length === 0)
    return res.status(400).send({ mesagge: "No search results" });
  return res.status(200).send({ roles });
};

const deleteRole = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ mesagge: "Incomplete data." });
  const roles = await role.findByIdAndDelete(req.params["_id"]);
  return roles
    ? res.status(200).send({ mesagge: "Role deleted." })
    : res.status(500).send({ mesagge: "Error deleting role" });
};

export default { roleRegister, listRole, deleteRole };
