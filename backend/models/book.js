import mongo from "mongoose";

const bookSchema = new mongo.Schema({
  author: String,
  name: String,
  isbn: String,
  section: [
    {
      name: String,
    },
  ],
  pages: Number,
  price: Number,
  isAvailable: true,
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const book = mongo.model("books", bookSchema);

export default book;
