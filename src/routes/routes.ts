import { Router } from "express";
import { addTasks } from "../controllers/taskController";

export const router = Router();

router.post("/task", addTasks);
