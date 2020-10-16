import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import {Recipe} from './recipe.model'

@Injectable()

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>()

    constructor(private slService: ShoppingListService) {

    }
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is a test', 'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',[
            new Ingredient('meat', 1),
            new Ingredient('fries', 20),
        ]),
        new Recipe('Another Test Recipe', 'This is a test', 'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',[
            new Ingredient('bread', 2),
            new Ingredient('meat', 2)
        ])
      ]

      getRecipes() {
          return this.recipes.slice()
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
      }
}