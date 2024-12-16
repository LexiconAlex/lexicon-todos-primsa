import PromptSync from "prompt-sync";

const input = PromptSync();

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
          input("Press enter to continue...");
          break;
        case "2":
          input("Press enter to continue...");
          break;
        case "3":
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
