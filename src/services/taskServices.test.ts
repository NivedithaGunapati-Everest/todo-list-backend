import { taskType } from "../types/types";
import { addTask } from "./taskServices";

let storedTask: taskType = {
  id: "12",
  name: "Cooking",
  description: "Cook biryani",
  status: "progress",
  priority: "low",
  date: "18/11/25",
};
jest.mock("../firebase/config", () => {
  const docMock = {
    get: jest.fn(() =>
      Promise.resolve({
        exists: Object.keys(storedTask).length > 0,
        data: (): taskType => storedTask,
      })
    ),
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
  };
  const collectionMock = {
    doc: jest.fn(() => docMock),
  };
  return {
    db: {
      collection: jest.fn(() => collectionMock),
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
});
