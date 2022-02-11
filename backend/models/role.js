import mongo from "mongoose";

const roleSchema = new mongo.Schema({
  name: String,
  description: String,
  dbStatus: Boolean,
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const role = mongo.model("roles", roleSchema);

export default role;
