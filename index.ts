import { TodoItem } from "./TodoItem.js";
import { TodoCollection } from "./TodoCollection.js";
import { JsonTodoCollection } from "./jsonTodoCollection.js";
import inquirer from "inquirer";
import chalk from "chalk";

let todos: TodoItem[] = [
	new TodoItem(1, "Reading a book", true),
	new TodoItem(2, "Coding"),
	new TodoItem(3, "washing face"),
];

let collection: TodoCollection = new JsonTodoCollection("Abishai", todos);

let showCompleted: boolean = true;

function displayTodo() {
	console.clear();

	console.log(
		chalk.whiteBright.bold.italic(
			`\n\t\t${collection.userName}'s Todo List ` +
				`(${collection.itemCount().incomplete} items to do) :`
		)
	);
	console.log(chalk.grey.bold("\t\t------------------------------------\n"));

	collection.getTodoItems(showCompleted).forEach((item) => item.showDetails());
}

// enum for commands
enum commands {
	Add = "Add New Task",
	Complete = "Complete Task",
	Toggle = "Show/Hide Completed",
	Purge = "Remove Completed Tasks",
	Quit = "Quit",
}

// func for add task command
function promptAdd() {
	console.clear();
	inquirer
		.prompt({
			name: "task",
			type: "input",
			message: "Enter a task :",
		})
		.then((answer) => {
			if (answer.task !== "") {
				collection.addTodo(answer.task);
			}

			promptUser();
		});
}

// func for mark complete
function promptComplete() {
	console.clear();
	inquirer
		.prompt({
			type: "checkbox",
			name: "complete",
			message: "Mark Tasks Completed :",
			choices: collection.getTodoItems(showCompleted).map((item) => ({
				name: item.task, //name property of checkbox tell tsc what will be displayed to user
				value: item.id, //value property of checkbox tells tsc what will be going to stored in complete key
				checked: item.isComplete, //checked property of checkbox tells tsc if the checkbox is already checked or not
			})),
		})
		.then((answers) => {
			if (answers.complete) {
				try {
					let completedTasks =
						answers.complete as number[]; /* telling typescript that answers["complete"] is an array of numbers
													using type assertion(it tells tsc to expect an array of numbers)*/

					collection.getTodoItems(true).forEach((item) => {
						collection.markComplete(
							item.id,
							completedTasks.find((id) => id === item.id) !== undefined
						);
					});
				} catch (e) {
					console.log("Something went wrong. Please try again");
				}
			}

			promptUser();
		});
}

// main func
function promptUser() {
	displayTodo();

	console.log();

	inquirer
		.prompt({
			name: "command",
			type: "list",
			message: chalk.hex("#94FFD8").bold("Choose Options :"),
			choices: Object.values(commands),
		})
		.then((ans) => {
			switch (ans.command) {
				case commands.Add:
					promptAdd();
					break;

				case commands.Complete:
					if (collection.itemCount().incomplete > 0) {
						promptComplete();
					} else {
						promptUser();
					}
					break;

				case commands.Toggle:
					showCompleted = !showCompleted;
					promptUser();
					break;

				case commands.Purge:
					collection.removeCompleted();
					promptUser();
					break;
				default:
					process.exit(0);
			}
		});
}

promptUser(); // calling main func
