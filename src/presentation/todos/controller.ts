import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodosRespository } from "../../domain";

export class TodosController {

    constructor(
        private readonly todoRepository: TodosRespository
    ) {}

    async getAll(req: Request, res: Response) {
        const todos = await this.todoRepository.getAll();
        return res.status(200).json({ data: todos });
    }

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).send("Invalid request");
        }

        try {

            const todo = await this.todoRepository.getById(id);
            if (!todo) {
                return res.status(404).send("Not found");
            }

            return res.status(200).json({ data: todo });
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server error");
        }
    }

    async create(req: Request, res: Response) {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (!error) {
            return res.status(400).send({ message: error });
        }

        try {

            const todo = await this.todoRepository.create(createTodoDto!);

            return  res.status(201).send(todo);

        } catch (e) {
            console.log(e);
            return res.status(500).send("Server error");
        }
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params["id"]);

        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (!error) {
            return res.status(400).send({ message: error });
        }

        try {

            const todo = await this.todoRepository.update(updateTodoDto!);

            return  res.status(201).send(todo);

        } catch (e) {
            console.log(e);
            return res.status(500).send("Server error");
        }
    }

    async remove(req: Request, res: Response) {
        const id = parseInt(req.params["id"]);

        try {

            await this.todoRepository.remove(id);

            return  res.status(200);

        } catch (e) {
            console.log(e);
            return res.status(500).send("Server error");
        }
    }

}
