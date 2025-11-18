import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/routes";
dotenv.config();

export const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
