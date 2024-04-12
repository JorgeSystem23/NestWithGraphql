import { Float, Int, Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: "Hola Mundo es lo que retorna",
    name: "hello",
  })
  helloWorld(): string {
    return "Hello World";
  }

  @Query(() => Float, { name: "RandomNumber" })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: "randomNumberToZero" })
  getRandomNumberToZero(): number {
    return Math.floor(Math.random() * 10);
  }
}
