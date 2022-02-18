import express from "express";
import bookController from "../controllers/bookController.js";
import bookValidate from "../middlewares/bookValidate.js";
const router = express.Router();

//http://localhost:4000/api/role/registerRole
router.post("/registerBook", bookValidate.existingBook, bookController.registerBook);

export default router;