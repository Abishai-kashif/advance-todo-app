import chalk from "chalk";

export class TodoItem {
	constructor(
		public id: number,
		public task: string,
		public isComplete: boolean = false
	) {
		// no statement needed
	}

	showDetails() {
		console.log(
			`${chalk.hex("#8F1537").bold("*")}  ${chalk.whiteBright.bold(
				this.task
			)}.\t${this.isComplete ? chalk.grey.bold("(completed)") : ""}`
		);
	}
}
