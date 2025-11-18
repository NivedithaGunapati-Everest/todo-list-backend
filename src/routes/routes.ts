import { Router } from "express";
import { addTasks, getAllTasks } from "../controllers/taskController";

export const router = Router();

router.post("/task", addTasks);
router.get("/tasks", getAllTasks);
