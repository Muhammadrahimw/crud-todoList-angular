import {Routes} from "@angular/router";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {FoodListPageComponent} from "./features/foods/pages/food-list-page/food-list-page.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {AuthGuard} from "./auth/guards/auth.guard";

export const routes: Routes = [
	{path: "", redirectTo: "login", pathMatch: "full"},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: `todo-list`,
		component: TodoListComponent,
		canActivate: [AuthGuard],
	},
	{
		path: `food-list`,
		component: FoodListPageComponent,
		canActivate: [AuthGuard],
	},
];
