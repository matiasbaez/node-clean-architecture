import { prisma } from "../../data/postgres";
import {
  CreateTodoDto,
  TodoEntity,
  TodosDataSource,
  UpdateTodoDto,
} from "../../domain";

export class TodoDataSourceImpl implements TodosDataSource {
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(TodoEntity.fromObject);
  }

  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id: id } });

    if (!todo) {
      throw new Error(`No todo with ID ${id} found`);
    }

    return TodoEntity.fromObject(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return TodoEntity.fromObject(todo);
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const found = await this.getById(updateTodoDto.id);
    if (!found) {
      throw new Error(`Could not find a todo with ID "${updateTodoDto.id}"`);
    }

    const todo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(todo);
  }

  async remove(id: number): Promise<void> {
    const found = await this.getById(id);
    if (!found) {
      throw new Error(`Could not find a todo with ID "${id}"`);
    }

    await prisma.todo.delete({
      where: { id },
    });
  }
}
