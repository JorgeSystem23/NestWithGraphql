import { Injectable, NotFoundException } from "@nestjs/common";
import { Todos } from "./entity/todos.entity";
import { CreateTodo } from "./dtos/inputs/create_todo.input";
import { UpdateTodo } from "./dtos/inputs/update-todo.input";
import { StatusArgs } from "./dtos/args/status.args";

@Injectable()
export class TodosService {
  private todos: Todos[] = [
    { id: 1, description: "Piedra de Alma", done: true },
    { id: 2, description: "Piedra de Espacio", done: false },
    { id: 3, description: "Piedra de Poder", done: true },
    { id: 4, description: "Piedra de Flacias", done: false },
  ];

  findAll(statusArgs: StatusArgs): Todos[] {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);

    return this.todos;
  }

  findOne(id: number): Todos {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

    return todo;
  }

  create(createTodo: CreateTodo): Todos {
    const todo = new Todos();

    todo.description = createTodo.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update(updateTodo: UpdateTodo) {
    const { id, description, done } = updateTodo;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) updateTodo.done = done;

    this.todos = this.todos.map((todo) => {
      return todo.id === updateTodo.id ? todoToUpdate : todo;
    });

    return todoToUpdate;
  }

  delete(id: number): Boolean {
    const todo = this.findOne(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return true;
  }
}
