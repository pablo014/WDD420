import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>()
    private ingredients = [
        new Ingredient('apple', 2),
        new Ingredient('pineapple', 5)
      ]

      getIngredients() {
        return this.ingredients.slice()
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientsChanged.emit(this.ingredients.slice())
      }

      addIngredients(ingredients: Ingredient[]) {
        // for(let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.emit(this.ingredients.slice())
      }
}