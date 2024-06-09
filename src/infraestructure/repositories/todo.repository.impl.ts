import {
  CreateTodoDto,
  TodoEntity,
  TodosDataSource,
  TodosRespository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl implements TodosRespository {
  constructor(private readonly datasource: TodosDataSource) {}

  async getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  async getById(id: number): Promise<TodoEntity> {
    return this.datasource.getById(id);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.update(updateTodoDto);
  }

  async remove(id: number): Promise<void> {
    return this.datasource.remove(id);
  }
}
