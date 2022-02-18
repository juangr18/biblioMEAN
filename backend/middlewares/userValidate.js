import user from "../models/user.js";

const existUser = async (req, res, next) => {
  if (!req.body.email || !req.body.id_document) {
    return res.status(400).send({ message: "Incomplete data" });
  }
  const existingEmail = await user.findOne({ email: req.body.email });
  const existingId = await user.findOne({ id_document: req.body.id_document });
  if (existingEmail || existingId)
    return res
      .status(500)
      .send({ message: "The user already exist to database." });
  next();
};

export default { existUser };
