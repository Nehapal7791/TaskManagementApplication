import { Router } from "express";
import UserRouter from "./user.route";
import taskRouter from "./task.route";

const router = Router();
router.use("/users", UserRouter);
router.use("/tasks", taskRouter);
export default router;
