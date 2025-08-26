import {
	AfterViewInit,
	BootstrapOptions,
	Component,
	ViewChild,
} from "@angular/core";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {Food} from "../../models/food.model";
import {FoodService} from "../../services/food.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {FoodDialogComponent} from "../food-dialog/food-dialog.component";
import {CommonModule} from "@angular/common";

@Component({
	selector: "app-food-table",
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		CommonModule,
	],
	templateUrl: "./food-table.component.html",
	styleUrl: "./food-table.component.css",
})
export class TableOverviewExample implements AfterViewInit {
	displayedColumns: string[] = [
		"id",
		"name",
		"category",
		"calories",
		"price",
		"actions",
	];
	isLoading: boolean = true;
	dataSource = new MatTableDataSource<Food>([]);

	constructor(
		private readonly foodService: FoodService,
		private notify: NotificationService,
		private dialog: MatDialog
	) {
		this.foodService.getFoods().subscribe((data) => {
			this.dataSource.data = data;
			this.isLoading = false;
		});
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	openDialog(food: Food) {
		this.dialog.open(FoodDialogComponent, {
			width: "400px",
			data: food,
		});
	}

	openEditDialog(food?: Food) {
		const dialogRef = this.dialog.open(FoodDialogComponent, {
			data: {...food},
		});

		dialogRef.afterClosed().subscribe((result: Food | undefined) => {
			if (result) {
				if (food) {
					const index = this.dataSource.data.findIndex(
						(f) => f.id === result.id
					);
					if (index !== -1) {
						this.dataSource.data[index] = result;
						this.dataSource._updateChangeSubscription();
					}
				} else {
					this.dataSource.data = [...this.dataSource.data, result];
				}
			}
		});
	}

	addFood(food: Food) {
		this.foodService.addFood(food).subscribe({
			next: () => {
				this.dataSource.data = [...this.dataSource.data, food];
			},
			error: (err) => {
				console.log(err);
				this.notify.error(`An error occurred.`);
			},
		});
	}

	deleteFood(food: Food) {
		this.foodService.deleteFood(food.id).subscribe({
			next: () => {
				this.dataSource.data = this.dataSource.data.filter(
					(f) => f.id !== food.id
				);
				this.notify.success(`Successfully deleted`);
			},
			error: (err) => {
				console.log(err);
				this.notify.error(`An error occurred.`);
			},
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
