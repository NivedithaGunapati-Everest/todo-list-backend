import { Request, Response } from "express";
import { addTask } from "../services/taskServices";
import { addTasks } from "./taskController";

jest.mock("../services/taskServices");
const mockAddTask = addTask as jest.Mock;

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

describe("Task controller", () => {
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
