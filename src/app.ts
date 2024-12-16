import PromptSync from "prompt-sync";

const input = PromptSync();

async function main() {
  console.log("1. Add todo");
  console.log("2. Mark todo as completed");
  console.log("3. List todos");
  console.log("4. Exit");

  while (true) {
    const option = input("Select an option: ");
    switch (option) {
      case "1":
        input("Press enter to continue...");
        break;
      case "2":
        console.log("Marking todo...");

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
  }
}

main();
