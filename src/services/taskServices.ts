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

export const updateTaskService = async (id: string, task: taskType) => {
  const taskExist = await tasksCollection.doc(id).get();
  if (!taskExist.exists) {
    return false;
  }
  const taskUpdate = await tasksCollection.doc(task.id).update(task);
  return task;
};

export const deleteTask = async (taskId: string) => {
  const taskExist = await tasksCollection.doc(taskId).get();
  if (!taskExist.exists) {
    return false;
  }
  const taskDelete = await tasksCollection.doc(taskId).delete();
  return ;
};
