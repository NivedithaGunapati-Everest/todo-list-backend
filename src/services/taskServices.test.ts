import { taskType } from "../types/types";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTaskService,
} from "./taskServices";

let storedTask: taskType = {
  id: "12",
  name: "Cooking",
  description: "Cook biryani",
  status: "progress",
  priority: "low",
  date: "18/11/25",
};

jest.mock("../firebase/config", () => {
  return {
    db: {
      collection: jest.fn(() => ({
        doc: jest.fn((id: string) => ({
          get: jest.fn(() => {
            const exists = storedTask.id === id;
            return Promise.resolve({
              exists,
              data: () => storedTask,
            });
          }),

          set: jest.fn((data: taskType) => {
            storedTask = data;
            return Promise.resolve();
          }),

          update: jest.fn((data: taskType) => {
            storedTask = data;
            return Promise.resolve();
          }),

          delete: jest.fn(() => {
            storedTask = {} as taskType;
            return Promise.resolve();
          }),
        })),

        get: jest.fn(() =>
          Promise.resolve({
            docs: [
              {
                id: storedTask.id,
                data: () => storedTask,
              },
            ],
          })
        ),
      })),
    },
  };
});

describe("task service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should add a tasks", async () => {
    const task = {
      id: "124",
      name: "Reading",
      description: "Atomic habits",
      status: "progress",
      priority: "low",
      date: "30/11/25",
    };
    const addTasks = await addTask(task);
    expect(addTasks).toStrictEqual(task);
  });

  test("Should get all the tasks", async () => {
    const tasks = await getTasks();
    expect(tasks).toStrictEqual([
      {
        id: "124",
        name: "Reading",
        description: "Atomic habits",
        status: "progress",
        priority: "low",
        date: "30/11/25",
      },
    ]);
  });

  test("Should update task with id 124", async () => {
    const taskId = "124";
    const task = {
      id: "124",
      name: "parents",
      description: "Call and talk to parents",
      status: "Not started",
      priority: "high",
      date: "19/11/25",
    };
    const update = await updateTaskService(taskId, task);
    expect(update).toStrictEqual({
      id: "124",
      name: "parents",
      description: "Call and talk to parents",
      status: "Not started",
      priority: "high",
      date: "19/11/25",
    });
  });

  test("Should return id not valid when given id is not present", async () => {
    const taskId = "1247890";
    const task = {
      id: "124",
      name: "parents",
      description: "Call and talk to parents",
      status: "Not started",
      priority: "high",
      date: "19/11/25",
    };
    const update = await updateTaskService(taskId, task);
    expect(update).toBe(false);
  });

  test("Should delete task for a valid id", async () => {
    const taskId = "124";
    const task = await deleteTask(taskId);
    expect(task).toBeUndefined();
  });

  test("Should return false when the id not exist", async () => {
    const taskId = "12468";
    const task = await deleteTask(taskId);
    expect(task).toBe(false);
  });
});
