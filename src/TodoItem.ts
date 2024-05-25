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
			`${chalk.hex("#FFA62F").bold("*")}  ${chalk
				.hex("#FFE8C8")
				.bold(this.task)}.\t${
				this.isComplete ? chalk.grey.bold("(completed)") : ""
			}`
		);
	}
}
