import PromptSync from "prompt-sync";
import { PrismaClient } from "@prisma/client";

const input = PromptSync();
const prisma = new PrismaClient();

async function main() {
  while (true) {
    try {
      console.log("1. Add todo");
      console.log("2. Mark todo as completed");
      console.log("3. List todos");
      console.log("4. Exit");
      const option = input("Option: ");
      switch (option) {
        case "1":
          await addTodo();
          input("Press enter to continue...");
          break;
        case "2":
          await completeTodo();
          input("Press enter to continue...");
          break;
        case "3":
          await listTodos();
          input("Press enter to continue...");
          break;
        case "4":
          return;
        default:
          console.log("Invalid option selected.");
          break;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else console.log("Unexpected error occurred.");
    }
  }
}

main();

async function addTodo() {
  const title = input("Name your todo: ");
  await prisma.todos.create({
    data: { title },
  });
}

async function completeTodo() {
  const id = parseInt(input("Enter your todo ID: "));
  await prisma.todos.update({
    where: { id },
    data: { completedAt: new Date() },
  });
}

async function listTodos() {
  const todos = await prisma.todos.findMany();
  todos.map((todo) =>
    console.log(`ID: ${todo.id} - ${todo.title} 
    ${
      !todo.completedAt
        ? `[] - Created at ${todo.createdAt.toLocaleDateString()}`
        : `[X] - Complete at ${todo.completedAt.toLocaleDateString()}`
    }`)
  );
}
