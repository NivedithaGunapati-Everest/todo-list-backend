import { db } from "../firebase/config";
import { taskType } from "../types/types";

const tasksCollection = db.collection("tasks");

export const addTask = async (task: taskType) => {
  await tasksCollection.doc(task.id).set(task);
  return task;
};

export const getTasks = async () => {
  const tasksRef = await tasksCollection.get();
  const data = tasksRef.docs.map((doc) => doc.data());
  return data;
};

