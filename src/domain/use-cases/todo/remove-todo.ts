import { TodosRespository } from "../../repositories/todos.repository";

export interface RemoveTodoUseCase {
  execute(id: number): Promise<void>;
}

export class RemoveTodo implements RemoveTodoUseCase {
  constructor(private readonly repository: TodosRespository) {}

  execute(id: number): Promise<void> {
    return this.repository.remove(id);
  }
}
