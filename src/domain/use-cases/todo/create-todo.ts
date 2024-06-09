import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodosRespository } from "../../repositories/todos.repository";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodosRespository) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
