import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodosRespository } from "../../repositories/todos.repository";

export interface UpdateTodoUseCase {
    execute( dto: UpdateTodoDto ): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {

    constructor(
        private readonly repository: TodosRespository
    ) {}

    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.update(dto);
    }

}
