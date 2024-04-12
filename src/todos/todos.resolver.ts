import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Todos } from "./entity/todos.entity";
import { TodosService } from "./todos.service";

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todos], { name: "todos" })
  findAll(): Todos[] {
    return this.todosService.getAllTodos();
  }

  @Query(() => Todos, { name: "Todo" })
  findOne(@Args("id", { type: () => Int }) id: number): Todos {
    return this.todosService.getOneTodo(id);
  }

  createTodo() {
    return [];
  }

  updateTodo() {
    return [];
  }

  deleteTodo() {
    return [];
  }
}
