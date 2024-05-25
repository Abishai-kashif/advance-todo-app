import chalk from "chalk";
export class TodoItem {
    id;
    task;
    isComplete;
    constructor(id, task, isComplete = false) {
        this.id = id;
        this.task = task;
        this.isComplete = isComplete;
        // no statement needed
    }
    showDetails() {
        console.log(`${chalk.hex("#FFA62F").bold("*")}  ${chalk
            .hex("#FFE8C8")
            .bold(this.task)}.\t${this.isComplete ? chalk.grey.bold("(completed)") : ""}`);
    }
}
