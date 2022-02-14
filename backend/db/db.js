import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to MongoDB is successfull");
  } catch (e) {
    console.log("Error at connect to DB \n", e);
  }
};

export default { dbConnection };
