import express from "express";
import bookController from "../controllers/bookController.js";
import bookValidate from "../middlewares/bookValidate.js";

const router = express.Router();

//http://localhost:4000/api/role/registerRole
router.post(
  "/registerBook",
  bookValidate.isCompleteData,
  bookValidate.existingBook,
  bookController.registerBook
);
router.get("/listBook/:name?", bookController.listBook);
router.put("/deleteBook", bookController.deleteBook);
router.put("/updateBook", bookController.updateBook);
export default router;
