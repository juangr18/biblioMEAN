import role from "../models/role.js";

const roleRegister = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ mensagge: "Incomplete data" });

  let schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  let result = await schema.save();
  if (!result)
    return res.status(500).send({ mensagge: "Failed to save on DataBase." });
  res.status(200).send({ result });
};

export default { roleRegister };