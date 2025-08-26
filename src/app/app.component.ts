import {Component} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, MatTabsModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "second-app";
	selectedIndex = 0;

	constructor(private router: Router) {}

	ngOnInit() {
		if (this.router.url.includes("todo-list")) {
			this.selectedIndex = 1;
		} else {
			this.selectedIndex = 0;
		}
	}

	onTabChange(index: number) {
		if (index === 0) {
			this.router.navigate(["/food-list"]);
		} else if (index === 1) {
			this.router.navigate(["/todo-list"]);
		}
	}
}
