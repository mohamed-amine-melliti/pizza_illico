// models/MenuItemIngredient.ts
import { MenuItem } from "./MenuItem";
import { Ingredient } from "./Ingredient";

export class MenuItemIngredient {
  menuItem: MenuItem;
  ingredient: Ingredient;

  constructor(menuItem: MenuItem, ingredient: Ingredient) {
    this.menuItem = menuItem;
    this.ingredient = ingredient;
  }
}
