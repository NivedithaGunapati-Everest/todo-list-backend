import { db } from "../firebase/config";
import { taskType } from "../types/types";

const tasksCollection = db.collection("tasks");

export const addTask = async (task: taskType) => {
  await tasksCollection.doc(task.id).set(task);
  return task;
};
