import book from "../models/book.js";

const isCompleteData = async (req, res, next) => {
  if (
    !req.body.isbn ||
    !req.body.author ||
    !req.body.name ||
    !req.body.section ||
    req.body.pages===0 ||
    req.body.price===0
  )
    return res.status(400).send({ message: "Incomplete data." });
  next();
};

const existingBook = async (req, res, next) => {
  const existIsbn =await book.findOne({ isbn: req.body.isbn });
  return existIsbn
    ? res.status(400).send({ message: "Book already exist to database." })
    : next();
};

export default { isCompleteData, existingBook };
