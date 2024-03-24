import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infraestructure/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const datasource = new TodoDataSourceImpl();
        const repository = new TodoRepositoryImpl(datasource);
        const todosController = new TodosController(repository);

        router.get("/", todosController.getAll);
        router.get("/:id", todosController.getById);
        router.post("/", todosController.create);
        router.put("/:id", todosController.update);
        router.delete("/:id", todosController.remove);

        return router;

    }

}
