import { Request, Response } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTaskService,
} from "../services/taskServices";

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

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const data = await getTasks();
    res.status(200).json(data);
  } catch {
    res.status(500).json("Error while fetching data");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updateId = req.params.id;
    const task = req.body;
    if (updateId) {
      const { id, name, description, status, priority, date } = task;
      if (!id || !name || !description || !status || !priority || !date) {
        res.status(404).json("Please fill all the details!");
      }
      const updateTask = await updateTaskService(updateId.toString(), task);
      if (updateTask === false) {
        res.status(404).json("The given id doesnot exist");
      }
      res.status(200).json({ message: "Updated successfully", task });
    } else {
      res.status(400).json("Id is required in the url");
    }
  } catch {
    res.status(500).json("Error while updating task");
  }
};

export const deleteSpecificTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    if (taskId) {
      const task = await deleteTask(taskId.toString());
      if (task === false) {
        res.status(404).json("The given id doesnot exist");
      }
      res.status(200).json("task deleted successfully");
    } else {
      res.status(400).json("Id is required in the url");
    }
  } catch {
    res.status(500).json({ message: "Error while deleting task" });
  }
};
