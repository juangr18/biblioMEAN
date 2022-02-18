import express from "express";
import cors from "cors";
import roleRoutes from "./routes/routeRole.js";
import userRoutes from "./routes/routeUser.js";
import bookRoutes from "./routes/routeBook.js";
import dotenv from "dotenv";
import db from "./db/db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes)

app.listen(process.env.PORT, () =>
  console.log("Backend server on port: ", process.env.PORT)
);
db.dbConnection();