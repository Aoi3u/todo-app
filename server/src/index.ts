import { PrismaClient } from '../generated/prisma';
import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8080;

const prisma = new PrismaClient;

app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);

});

app.listen(PORT, () => console.log("server is running"));
