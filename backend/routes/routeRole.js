import express from "express";
import roleController from "../controllers/roleController.js";

const router = express.Router();

//http://localhost:4000/api/role/registerRole
router.post("/registerRole", roleController.roleRegister);

export default router;