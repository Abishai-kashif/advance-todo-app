import { TodoItem } from "./TodoItem.js";

type ItemCountsType = {
	// type aliases for itemCounts func
	total: number;
	incomplete: number;
};

// class for managing a collection of TodoItems.
export class TodoCollection {
	private nextId: number = 1;
	protected mapItems = new Map<number, TodoItem>();
	constructor(public userName: string, public todoItems: TodoItem[] = []) {
		todoItems.forEach((item) => this.mapItems.set(item.id, item));
	}

	addTodo(task: string): number {
		while (this.getTodoById(this.nextId)) {
			this.nextId++;
		}

		this.mapItems.set(this.nextId, new TodoItem(this.nextId, task));
		return this.nextId;
	}

	getTodoById(id: number): any {
		return this.mapItems.get(id);
	}

	getTodoItems(includeCompleted: boolean): TodoItem[] {
		// func for getting all the tasks
		return [...this.mapItems.values()].filter(
			(todo) => !todo.isComplete || includeCompleted
		);
	}

	markComplete(id: number, complete: boolean): void {
		let todoItem = this.getTodoById(id);
		todoItem.isComplete = complete;
	}

	removeCompleted(): void {
		// func for removed the deleted tasks
		this.mapItems.forEach((value, key) =>
			value.isComplete ? this.mapItems.delete(key) : null
		);
	}

	itemCount(): ItemCountsType {
		return {
			total: this.mapItems.size,
			incomplete: this.getTodoItems(false).length,
		};
	}
}
