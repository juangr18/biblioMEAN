import book from "../models/book.js";

const registerBook = async (req, res) => {
  let schema = new book({
    isbn: req.body.isbn,
    author: req.body.author,
    name: req.body.name,
    section: req.body.section,
    pages: req.body.pages,
    price: req.body.price,
    isAvailable: true,
  });
  const result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register book." });
  return res.status(200).send({ result });
};

const listBook = async (req, res) => {
  let books = await book.find({ name: new RegExp(req.params["name"]) });
  if (books.length === 0)
    return res.status(400).send({ mesagge: "No search results" });
  return res.status(200).send({ books });
};

const deleteBook = async (req, res) => {
  if (!req.body._id)
    return res.status(400).send({ message: "Incomplete data" });
  const books = await book.findByIdAndUpdate(req.body._id, {
    isAvailable: false,
  });
  return books
    ? res.status(200).send({ message: "Delete book" })
    : res.status(500).send({ message: "Error deleting book" });
};

const updateBook = async (req, res) => {
  if (
    !req.body._id ||
    !req.body.isbn ||
    !req.body.author ||
    !req.body.name ||
    !req.body.section | !req.body.pages ||
    !req.body.price
  )
    return res.status(400).send({ message: "Incomplete data" });
  const bookUpdate = await book.findByIdAndUpdate(req.body._id, {
    isbn: req.body.isbn,
    author: req.body.author,
    name: req.body.name,
    section: req.body.section,
    pages: req.body.pages,
    price: req.body.price,
  });
  return bookUpdate
    ? res.status(200).send({ message: "Updated book" })
    : res.status(500).send({ message: "Error update book" });
};
export default { registerBook, listBook, deleteBook, updateBook };
