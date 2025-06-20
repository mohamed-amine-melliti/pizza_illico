// models/MenuCategory.ts
export class MenuCategory {
  id: number;
  name: string;
  description: string;
  image: string;

  constructor(id: number, name: string , description : string , image : string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;

  }
}



export const categories: MenuCategory[] = [
  new MenuCategory(1, "Nos Tortillas", "Delicious tortilla wraps", "https://png.pngtree.com/png-vector/20240807/ourmid/pngtree-tortilla-wrap-concepts-png-image_13115427.png"),
  new MenuCategory(2, "Nos Pizzas",    "Delicious Pizzas", "https://t3.ftcdn.net/jpg/07/70/75/16/360_F_770751689_FZdxDkfXHjeKTK4C49yapEIkiuafVJEY.jpg"),
  new MenuCategory(3, "Nos Paninis",   "Delicious paninis wraps", "https://static.vecteezy.com/system/resources/thumbnails/046/437/705/small_2x/sandwich-transparent-background-png.png"),
  new MenuCategory(4, "Nos Tex  Mex",  "Delicious Tex Mex wraps", "https://png.pngtree.com/png-vector/20240807/ourmid/pngtree-tortilla-wrap-concepts-png-image_13115427.png")

];
