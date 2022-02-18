import user from "../models/user.js";

const existUser = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({ menssage: "Incomplete data" });
  }
  const existingEmail = await user.findOne({
    id_document: req.body.id_document,
  });
  if (existingEmail)
    return res
      .status(500)
      .send({ menssage: "The user already exist to database." });
  next();
};

export default { existUser };
