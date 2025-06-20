// models/MenuItem.ts
import { MenuCategory } from "./MenuCategory";

export class MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;

  constructor(id: number, name: string, description: string, price: number, category: MenuCategory) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}
