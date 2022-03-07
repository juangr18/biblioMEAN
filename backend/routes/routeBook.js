import express from "express";
import bookController from "../controllers/bookController.js";
import bookValidate from "../middlewares/bookValidate.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

//http://localhost:4000/api/role/registerRole
router.post(
  "/registerBook", auth,
  bookValidate.isCompleteData,
  bookValidate.existingBook,
  bookController.registerBook
);
router.get("/listBook/:name?", auth, bookController.listBook);
router.put("/deleteBook", auth, bookController.deleteBook);
router.put(
  "/updateBook", auth,
  bookValidate.isCompleteData,
  bookController.updateBook
);
export default router;
