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
        console.log(`${chalk.hex("#8F1537").bold("*")}  ${chalk.whiteBright.bold(this.task)}.\t${this.isComplete ? chalk.grey.bold("(completed)") : ""}`);
    }
}
