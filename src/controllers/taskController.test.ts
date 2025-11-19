import { Request, Response } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTaskService,
} from "../services/taskServices";
import {
  addTasks,
  deleteSpecificTask,
  getAllTasks,
  updateTask,
} from "./taskController";

const tasks = {
  id: "1",
  name: "study",
  description: "read book",
  status: "progress",
  priority: "medium",
  date: "18/11/25",
};

jest.mock("../services/taskServices");
const mockAddTask = addTask as jest.Mock;
const mockGetTask = getTasks as jest.Mock;
const mockUpdateTask = updateTaskService as jest.Mock;
const mockDeleteTask = deleteTask as jest.Mock;

const createMockReqRes = (params = {}, body = {}) => {
  const req = {
    params,
    body,
  } as Partial<Request>;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as Partial<Response>;
  return { req, res };
};

describe("Add task controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Should give 201 as status ", async () => {
    const task = {
      id: "12",
      name: "Cooking",
      description: "Cook biryani",
      status: "progress",
      priority: "low",
      date: "18/11/25",
    };
    mockAddTask.mockResolvedValue(undefined);
    const { req, res } = createMockReqRes({}, task);
    await addTasks(req as Request, res as Response);
    expect(mockAddTask).toHaveBeenCalledWith(task);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("Should give 500 as status when service fails ", async () => {
    const task = {
      id: "12",
      name: "Cooking",
      description: "Cook biryani",
      status: "progress",
      priority: "low",
      date: "18/11/25",
    };
    mockAddTask.mockRejectedValue(undefined);
    const { req, res } = createMockReqRes({}, task);
    await addTasks(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Should give 404 as status when any field is missing ", async () => {
    const task = {
      id: "14",
      name: "",
      description: "Cook biryani",
      status: "progress",
      priority: "low",
      date: "18/11/25",
    };
    mockAddTask.mockResolvedValue(undefined);
    const { req, res } = createMockReqRes({}, task);
    await addTasks(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Please fill all details!");
  });
});

describe("Get tasks controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Should return response status 200", async () => {
    mockGetTask.mockResolvedValue(tasks);
    const { req, res } = createMockReqRes({}, {});
    await getAllTasks(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  test("Should return error when server fails", async () => {
    mockGetTask.mockRejectedValueOnce(tasks);
    const { req, res } = createMockReqRes({}, {});
    await getAllTasks(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("Update tasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Should return response status as 200 for successful update", async () => {
    const taskId = { id: "14" };
    const task = {
      id: "14",
      name: "Reading",
      description: "Read self motivated books",
      status: "progress",
      priority: "medium",
      date: "21/11/25",
    };
    mockUpdateTask.mockResolvedValue(undefined);
    const { req, res } = createMockReqRes(taskId, task);
    await updateTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should return response status as 404 when any of field is missing", async () => {
    const taskId = { id: "14" };
    const task = {
      id: "14",
      name: "",
      description: "Read self motivated books",
      status: "progress",
      priority: "medium",
      date: "21/11/25",
    };
    mockUpdateTask.mockResolvedValue(undefined);
    const { req, res } = createMockReqRes(taskId, task);
    await updateTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("Should return response status as 400 when id is not present in the request", async () => {
    const taskId = { id: "" };
    const task = {
      id: "14",
      name: "",
      description: "Read self motivated books",
      status: "progress",
      priority: "medium",
      date: "21/11/25",
    };
    mockUpdateTask.mockResolvedValue(undefined);
    const { req, res } = createMockReqRes(taskId, task);
    await updateTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("Should return response status as 404 and id not exist where requested id is not present", async () => {
    const taskId = { id: "3456" };
    const task = {
      id: "14",
      name: "Reading",
      description: "Read self motivated books",
      status: "progress",
      priority: "medium",
      date: "21/11/25",
    };
    mockUpdateTask.mockResolvedValue(false);
    const { req, res } = createMockReqRes(taskId, task);
    await updateTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("The given id doesnot exist");
  });

  test("Should return response status as 500 when server fails", async () => {
    const taskId = { id: "14" };
    const task = {
      id: "14",
      name: "Reading",
      description: "Read self motivated books",
      status: "progress",
      priority: "medium",
      date: "21/11/25",
    };
    mockUpdateTask.mockRejectedValue(undefined);
    const { req, res } = createMockReqRes(taskId, task);
    await updateTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error while updating task");
  });
});

describe("Delete task controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should return response of 200 for successful delete", async () => {
    const taskId = { id: "14" };
    mockDeleteTask.mockResolvedValue(true);
    const { req, res } = createMockReqRes(taskId, {});
    await deleteSpecificTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should return error when given id not exist", async () => {
    const taskId = { id: "144567" };
    mockDeleteTask.mockResolvedValue(false);
    const { req, res } = createMockReqRes(taskId, {});
    await deleteSpecificTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("The given id doesnot exist");
  });

  test("Should return error when id is not given in the url", async () => {
    const taskId = { id: "" };
    mockDeleteTask.mockResolvedValue(true);
    const { req, res } = createMockReqRes(taskId, {});
    await deleteSpecificTask(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Id is required in the url");
  });
});
