import { Router } from "express";
import userRouter from "./user.js"
import commonRouter from "./common.js"
const router = Router();

router.use("/", commonRouter)
router.use("/user", userRouter)
export default router; 