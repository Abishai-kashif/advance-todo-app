import { TodoItem } from "./TodoItem.js";
// class for managing a collection of TodoItems.
export class TodoCollection {
    userName;
    todoItems;
    nextId = 1;
    mapItems = new Map();
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        todoItems.forEach((item) => this.mapItems.set(item.id, item));
    }
    addTodo(task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.mapItems.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }
    getTodoById(id) {
        return this.mapItems.get(id);
    }
    getTodoItems(includeCompleted) {
        // func for getting all the tasks
        return [...this.mapItems.values()].filter((todo) => !todo.isComplete || includeCompleted);
    }
    markComplete(id, complete) {
        let todoItem = this.getTodoById(id);
        todoItem.isComplete = complete;
    }
    removeCompleted() {
        // func for removed the deleted tasks
        this.mapItems.forEach((value, key) => value.isComplete ? this.mapItems.delete(key) : null);
    }
    itemCount() {
        return {
            total: this.mapItems.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
}
