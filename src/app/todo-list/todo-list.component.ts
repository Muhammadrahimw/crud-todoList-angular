import {NgClass, NgForOf} from "@angular/common";
import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";

interface taskType {
	id: number;
	title: string;
	completed: boolean;
}

@Component({
	selector: "app-todo-list",
	imports: [FormsModule, NgForOf, NgClass],
	templateUrl: "./todo-list.component.html",
	styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent {
	newTask: string = "";
	tasksList: taskType[] = [].reverse();
	isEditTask: boolean = false;
	editTaskId: number | null = null;

	addTask() {
		if (this.newTask.trim() === "") return;
		if (this.isEditTask) {
			this.tasksList = this.tasksList.map((task) =>
				task.id === this.editTaskId ? {...task, title: this.newTask} : task
			);
			this.resetForm();
			return;
		}

		this.tasksList.push({
			id: Date.now(),
			title: this.newTask,
			completed: false,
		});

		this.resetForm();
	}

	toggleTask(task: taskType) {
		this.tasksList = this.tasksList.map((item) => {
			if (item.id === task.id) {
				return {...item, completed: !item.completed};
			}
			return item;
		});
	}

	deleteTask(id: number) {
		this.tasksList = this.tasksList.filter((task) => task.id !== id);
	}

	editTask(editingTask: taskType) {
		this.isEditTask = true;
		this.editTaskId = editingTask.id;
		this.newTask = editingTask.title;
	}

	resetForm() {
		this.newTask = "";
		this.isEditTask = false;
		this.editTaskId = null;
	}
}
