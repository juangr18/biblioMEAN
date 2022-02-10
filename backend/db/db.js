import mongoose from "mongoose";

const dbConnection = () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlPraser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to MongoDB is successfull");
  } catch (e) {
    console.log("Error at connect to DB \n", e);
  }
};

export default { dbConnection };
