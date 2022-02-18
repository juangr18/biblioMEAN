import role from "../models/role.js";

const existRole = async (req, res, next) => {
  const roleId = await role.findOne({ name: "user" });
  if (!roleId)
    return res.status(400).send({ menssage: "No role was assigned." });
  req.body.role = roleId._id;

  next();
};

const duplicateRole= async (req, res, next) =>{
  const roleExist= await role.findOne({name:new RegExp(req.params["name"])});
  if(roleExist) return res.status(400).send({menssage:"Role already exist to database."});
  next();
};

export default { existRole,duplicateRole };
