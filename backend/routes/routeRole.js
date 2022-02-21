import express from "express";
import roleController from "../controllers/roleController.js";
import roleValidate from "../middlewares/roleValidate.js";

const router = express.Router();

//http://localhost:4000/api/role/registerRole
router.post("/registerRole", roleValidate.duplicateRole, roleController.roleRegister);
router.get("/listRole/:name?", roleController.listRole);
router.delete("/deleteRole/:_id", roleController.deleteRole);

export default router;