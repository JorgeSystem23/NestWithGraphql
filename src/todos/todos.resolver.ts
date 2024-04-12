import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Todos } from "./entity/todos.entity";
import { TodosService } from "./todos.service";
import { CreateTodo, UpdateTodo, StatusArgs } from "./dtos";

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todos], { name: "todos" })
  findAll(@Args() status: StatusArgs): Todos[] {
    return this.todosService.findAll(status);
  }

  @Query(() => Todos, { name: "Todo" })
  findOne(@Args("id", { type: () => Int }) id: number): Todos {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todos)
  createTodo(@Args("createTodoInput") createTodoInput: CreateTodo) {
    return this.todosService.create(createTodoInput);
  }

  @Mutation(() => Todos)
  updateTodo(@Args("updateTodoInput") updateTodoInput: UpdateTodo) {
    return this.todosService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args("id", { type: () => Int }) id: number) {
    return this.todosService.delete(id);
  }
}
