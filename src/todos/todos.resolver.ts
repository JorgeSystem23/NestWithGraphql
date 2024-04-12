import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Todos } from "./entity/todos.entity";
import { TodosService } from "./todos.service";
import { CreateTodo } from "./dtos/inputs/create_todo.input";

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

  @Mutation( ()=>Todos )
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodo
  ) {
    return this.todosService.create(createTodoInput);
  }

  updateTodo() {
    return [];
  }

  deleteTodo() {
    return [];
  }
}
