import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients = [
    {name: 'Apples', amount: 5},
    {name: 'Tomatoes', amount: 10}
  ]
  constructor() { }

  onIngredientAdded(ingredient) {
    this.ingredients.push(ingredient)
  }

  ngOnInit(): void {
  }

}
