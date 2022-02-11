import mongo from "mongoose";

const userSchema = new mongo.Schema({
  id_document: Number,
  name: String,
  last: String,
  email: String,
  password: String,
  role: {
    type: mongo.Schema.ObjectId,
    ref: "roles",
  },
  bookShop:[{
      type:mongoose.Schema.ObjectId, ref:"books",
    }
  ],
  registerDate: {
    type: Date,
    default: Date.now,
  },
  dbStatus: true,
});

const user = mongo.model("users", userSchema);

export default user;
