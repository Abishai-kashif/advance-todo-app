import { TodoItem } from "./TodoItem.js";
import { TodoCollection } from "./TodoCollection.js";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

// defining type schema for // structure of data in database
type typeSchema = {
	tasks: { id: number; task: string; isComplete: boolean }[];
};

// defining derived class
export class JsonTodoCollection extends TodoCollection {
	private database: LowSync<typeSchema>; // initializing database with type schema

	// taking information on initialization
	constructor(public userName: string, todoItems: TodoItem[] = []) {
		super(userName, []); // transfering information to parent constructor

		// creating database
		this.database = new LowSync(new JSONFileSync("Todos.json"), {
			tasks: [],
		});
		this.database.read();

		// if there is no data in database
		if (this.database.data == null) {
			this.database.data = { tasks: todoItems };
			this.database.write();

			todoItems.forEach((item) => this.mapItems.set(item.id, item));
		} else {
			this.database.data.tasks.forEach((item) => {
				this.mapItems.set(
					item.id,
					new TodoItem(item.id, item.task, item.isComplete)
				);
			});
		}
	}

	// overiding parent method
	addTodo(task: string): number {
		const newId = super.addTodo(task);

		this.writeDatabase();
		return newId;
	}

	markComplete(id: number, complete: boolean): void {
		super.markComplete(id, complete);
		this.writeDatabase();
	}

	removeCompleted(): void {
		super.removeCompleted();
		this.writeDatabase();
	}

	// method for writing to database in case of changes in data
	private writeDatabase() {
		this.database.data.tasks = [...this.mapItems.values()];
		this.database.write();
	}
}
