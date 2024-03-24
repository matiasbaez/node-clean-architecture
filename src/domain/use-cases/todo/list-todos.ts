import { TodoEntity } from "../../entities/todo.entity";
import { TodosRespository } from "../../repositories/todos.repository";

export interface GetAllTodosUseCase {
    execute( ): Promise<TodoEntity[]>;
}

export class GetAllTodos implements GetAllTodosUseCase {

    constructor(
        private readonly repository: TodosRespository
    ) {}

    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }

}
