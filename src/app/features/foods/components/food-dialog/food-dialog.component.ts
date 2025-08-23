import {Component, Inject} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from "@angular/material/dialog";
import {Food} from "../../models/food.model";
import {FoodService} from "../../services/food.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {FormsModule} from "@angular/forms";

@Component({
	selector: "app-food-dialog",
	templateUrl: "./food-dialog.component.html",
	standalone: true,
	imports: [
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatButtonModule,
		FormsModule,
	],
})
export class FoodDialogComponent {
	name: string = "";
	category: string = "";
	calories: number = 0;
	price: number = 0;

	constructor(
		private readonly foodService: FoodService,
		private notify: NotificationService,
		public dialogRef: MatDialogRef<FoodDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Food
	) {}

	onClose(): void {
		this.dialogRef.close();
	}

	onSave(): void {
		if (this.data?.id) {
			this.foodService.editFood(this.data).subscribe({
				next: (updatedFood) => {
					this.dialogRef.close(updatedFood);
					this.notify.success(`Successfully edited.`);
				},
				error: () => this.notify.error(`An error occurred.`),
			});
		} else {
			this.foodService.addFood(this.data).subscribe({
				next: (createdFood) => {
					this.dialogRef.close(createdFood);
					this.notify.success(`Successfully created`);
				},
			});
		}
	}
}
