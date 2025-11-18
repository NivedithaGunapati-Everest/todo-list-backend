import { Request, Response } from "express";
import { addTask } from "../services/taskServices";

export const addTasks = async (req: Request, res: Response) => {
  try {
    const { id, name, description, status, priority, date } = req.body;
    if (!id || !name || !description || !status || !priority || !date) {
      res.status(404).json("Please fill all details!");
    }
    const task = { id, name, description, status, priority, date };
    await addTask(task);
    res.status(201).json({ message: "task added successfully", task });
  } catch {
    res.status(500).json("Error while adding task");
  }
};
