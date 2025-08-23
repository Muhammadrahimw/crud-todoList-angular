import {Routes} from "@angular/router";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {FoodListPageComponent} from "./features/foods/pages/food-list-page/food-list-page.component";

export const routes: Routes = [
	{
		path: `todo-list`,
		component: TodoListComponent,
	},
	{
		path: `food-list`,
		component: FoodListPageComponent,
	},
];
