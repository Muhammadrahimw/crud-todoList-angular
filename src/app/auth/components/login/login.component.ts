import {Component} from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {CommonModule} from "@angular/common";

@Component({
	selector: "app-login",
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		CommonModule,
	],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
})
export class LoginComponent {
	form: FormGroup;
	isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private notify: NotificationService
	) {
		this.form = this.fb.group({
			username: ["emilys", Validators.required],
			password: ["emilyspass", Validators.required],
		});
	}

	onSubmit() {
		this.isLoading = true;
		if (this.form.valid) {
			this.auth
				.login(this.form.value.username, this.form.value.password)
				.subscribe({
					next: () => {
						this.notify.success(`Successfully logged in`);
						this.isLoading = false;
					},
					error: () => {
						this.notify.error(`Invalid username or password!`);
						this.isLoading = false;
					},
				});
		}
	}
}
