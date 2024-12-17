import PromptSync from "prompt-sync";
import { PrismaClient } from "@prisma/client";

const input = PromptSync();
const prisma = new PrismaClient();

async function main() {
  while (true) {
    try {
      console.log("1. Add user");
      console.log("2. Add todo");
      console.log("3. Mark todo as completed");
      console.log("4. List todos");
      console.log("5. Exit");
      const option = input("Option: ");
      switch (option) {
        case "1":
          await addUser();
          break;
        case "2":
          await addTodo();
          input("Press enter to continue...");
          break;
        case "3":
          await completeTodo();
          input("Press enter to continue...");
          break;
        case "4":
          await listTodos();
          input("Press enter to continue...");
          break;
        case "5":
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

async function addUser() {
  const newUser = input("Enter your name: ");
  const user = await prisma.user.create({
    data: { name: newUser },
  });
  console.log(user);
  const answer = await input("Do you want to add a todo(y/n): ");
  if (answer === "y") {
    const newTodo = input("Name your todo: ");
    await prisma.todos.create({
      data: { title: newTodo, userId: user.id },
    });
  }
}

async function addTodo() {
  const username = input("Whats your name: ");
  const user = await prisma.user.findFirstOrThrow({
    where: {
      name: username,
    },
  });
  const title = input("Name your todo: ");
  await prisma.todos.create({
    data: { title, userId: user.id },
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
