import mongo from "mongoose";

const bookSchema = new mongo.Schema({
  isbn: String,
  author: String,
  name: String,
  section: [
    {
      names: String,
    },
  ],
  pages: Number,
  price: Number,
  isAvailable: Boolean,
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const book = mongo.model("books", bookSchema);

export default book;
