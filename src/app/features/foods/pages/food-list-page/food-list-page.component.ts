import { Component } from '@angular/core';
import { TableOverviewExample } from "../../components/food-table/food-table.component";

@Component({
  selector: 'app-food-list-page',
  imports: [TableOverviewExample],
  templateUrl: './food-list-page.component.html',
  styleUrl: './food-list-page.component.css'
})
export class FoodListPageComponent {

}
