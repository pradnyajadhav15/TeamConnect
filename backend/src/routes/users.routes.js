import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";  // ✅ import controllers

const router = Router();

router.post("/login", login);
router.post("/register", register);

// If you plan to implement these later, you can import and add them too
// import { addToActivity, getAllActivity } from "../controllers/user.controller.js";
// router.post("/add_to_activity", addToActivity);
// router.get("/get_all_activity", getAllActivity);

export default router;
