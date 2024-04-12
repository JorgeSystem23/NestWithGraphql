import { Args, Float, Int, Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: "Hola Mundo es lo que retorna",
    name: "hello",
  })
  helloWorld(): string {
    return "Hello World";
  }

  @Query(() => Float, { description: 'Esta query muestra numeros Random', name: "RandomNumber" })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { description: 'Esta query muestra numeros Random, con Argumentos', name: "randomNumberToZero" })
  getRandomNumberToZero(
    @Args("to", { nullable: true, type: () => Int }) to: number
  ): number {
    return Math.floor(Math.random() * to);
  }
}
