import express from "express";
import userController from "../controllers/userController.js";
import userValidate from "../middlewares/userValidate.js";
import roleValidate from "../middlewares/roleValidate.js";

const router = express.Router();
//http://localhost:4000/api/user/registerUser
router.post(
  "/registerUser",
  userValidate.existUser,
  roleValidate.existRole,
  userController.registerUser
);

export default router;
