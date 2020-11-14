import { EventEmitter, Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import {Recipe} from './recipe.model'

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()

    constructor(private slService: ShoppingListService) {

    }
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 'This is a test', 'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',[
    //         new Ingredient('meat', 1),
    //         new Ingredient('fries', 20),
    //     ]),
    //     new Recipe('Another Test Recipe', 'This is a test', 'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',[
    //         new Ingredient('bread', 2),
    //         new Ingredient('meat', 2)
    //     ])
    //   ]
    private recipes: Recipe[] = []
      getRecipes() {
          return this.recipes.slice()
      }

      getRecipe(id:number) {
          return this.recipes[id]
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
      }
      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
      }
      deleteRecipe(index: number){
          this.recipes.splice(index, 1)
          this.recipesChanged.next(this.recipes.slice())
      }
      setRecipes(recipes: Recipe[]){
        this.recipes = recipes
        this.recipesChanged.next(this.recipes.slice())
      }
}