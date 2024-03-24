import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodosDataSource {

    abstract getAll(): Promise<TodoEntity[]>;
    abstract getById(id: number): Promise<TodoEntity>;
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    abstract update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract remove(id: number): Promise<void>;

}
