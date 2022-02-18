import book from "../models/book.js";

const existingBook = async (req, res, next) => {
  if (!req.body.isbn)
    return res.status(400).send({ menssage: "Incomplete data." });
  const existIsbn = book.findOne(req.body.isbn);
  if (existIsbn)
    return res
      .status(500)
      .send({ menssahge: "The book already exist in database." });
  next();
};

export default {existingBook}