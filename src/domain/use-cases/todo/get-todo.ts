import { TodoEntity } from "../../entities/todo.entity";
import { TodosRespository } from "../../repositories/todos.repository";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repository: TodosRespository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.getById(id);
  }
}
