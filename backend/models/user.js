import mongo from "mongoose";

const userSchema = new mongo.Schema({
  id_document:String,
  name: String,
  last: String,
  email: String,
  password: String,
  role: {
    type: mongo.Schema.ObjectId,
    ref: "roles",
  },
  bookShop:[{
      type:mongo.Schema.ObjectId, ref:"books",
    }
  ],
  registerDate: {
    type: Date,
    default: Date.now,
  },
  dbStatus: Boolean,
});

const user = mongo.model("users", userSchema);

export default user;
