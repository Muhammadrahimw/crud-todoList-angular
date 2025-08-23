import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Food} from "../models/food.model";

@Injectable({
	providedIn: "root",
})
export class FoodService {
	private apiUrl = `https://6759b459099e3090dbe2a4ae.mockapi.io/data/shipments`;
	constructor(private http: HttpClient) {}

	getFoods(): Observable<Food[]> {
		return this.http.get<Food[]>(this.apiUrl);
	}

	addFood(food: Food): Observable<Food> {
		return this.http.post<Food>(this.apiUrl, food);
	}

	deleteFood(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}

	editFood(food: Food): Observable<Food> {
		return this.http.put<Food>(`${this.apiUrl}/${food.id}`, food);
	}
}
