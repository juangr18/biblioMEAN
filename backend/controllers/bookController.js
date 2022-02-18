import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (
    !req.body.author ||
    !req.body.name ||
    !req.body.section ||
    !req.body.pages ||
    !req.body.price
  )
    return res.status(400).send({ menssage: "Incomplete data." });
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
    return res.status(500).send({ menssage: "Failed to register book." });
  return res.status(200).send({ result });
};

export default { registerBook };
