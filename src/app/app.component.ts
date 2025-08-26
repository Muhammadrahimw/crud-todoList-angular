import {Component} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {AuthService} from "./auth/services/auth.service";
import {NotificationService} from "./shared/services/notification.service";
import {Observable, pipe} from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, MatTabsModule, CommonModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "second-app";
	selectedIndex = 0;
	isLogged$!: Observable<boolean>;

	constructor(
		private router: Router,
		private auth: AuthService,
		private notify: NotificationService
	) {}

	ngOnInit() {
		this.isLogged$ = this.auth.isLogged$;
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

	logOut() {
		if (this.isLogged$) {
			this.auth.logOut();
			this.notify.success(`You are logged out`);
		} else {
		}
	}
}
