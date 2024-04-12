import { Injectable, NotFoundException } from "@nestjs/common";
import { Todos } from "./entity/todos.entity";
import { CreateTodo } from "./dtos/inputs/create_todo.input";

@Injectable()
export class TodosService {
  private todos: Todos[] = [
    { id: 1, description: "Piedra de Alma", done: true },
    { id: 2, description: "Piedra de Espacio", done: true },
    { id: 3, description: "Piedra de Poder", done: true },
  ];

  getAllTodos(): Todos[] {
    return this.todos;
  }

  getOneTodo(id: number): Todos {
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
}
