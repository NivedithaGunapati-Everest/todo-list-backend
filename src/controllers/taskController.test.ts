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
});
