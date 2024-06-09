import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodosRespository } from "../../domain";
import {
  CreateTodo,
  GetAllTodos,
  GetTodo,
  RemoveTodo,
  UpdateTodo,
} from "../../domain/use-cases";

export class TodosController {
  constructor(private readonly todoRepository: TodosRespository) {}

  getAll(req: Request, res: Response) {
    new GetAllTodos(this.todoRepository)
      .execute()
      .then((todos) => {
        return res.status(200).json({ data: todos });
      })
      .catch(() => {
        return res.status(500).json({ error: "Internal server error" });
      });
  }

  getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => {
        return res.status(200).json({ data: todo });
      })
      .catch(() => {
        return res.status(500).json({ error: "Internal server error" });
      });
  }

  create(req: Request, res: Response) {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (!error) {
      return res.status(400).send({ message: error });
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => {
        return res.status(200).json({ data: todo });
      })
      .catch(() => {
        return res.status(500).json({ error: "Internal server error" });
      });
  }

  update(req: Request, res: Response) {
    const id = parseInt(req.params["id"]);

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (!error) {
      return res.status(400).send({ message: error });
    }

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => {
        return res.status(200).json({ data: todo });
      })
      .catch(() => {
        return res.status(500).json({ error: "Internal server error" });
      });
  }

  remove(req: Request, res: Response) {
    const id = parseInt(req.params["id"]);

    new RemoveTodo(this.todoRepository)
      .execute(id)
      .then(() => {
        return res.status(200);
      })
      .catch(() => {
        return res.status(500).json({ error: "Internal server error" });
      });
  }
}
