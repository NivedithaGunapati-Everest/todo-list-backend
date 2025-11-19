import { Router } from "express";
import {
  addTasks,
  getAllTasks,
  updateTask,
} from "../controllers/taskController";

export const router = Router();

router.post("/task", addTasks);
router.get("/tasks", getAllTasks);
router.put("/task/:id", updateTask);
