export class TortillaItem {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;

  constructor(id: number, name: string, description: string, image: string, category: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.category = category;
  }
}

export const tortillasMenu: TortillaItem[] = [
  new TortillaItem(
    1,
    "Viande Hachée",
    "Oignons, poivrons, fromage, avec un boisson 33cl au choix",
    "https://png.pngtree.com/png-clipart/20240826/original/pngtree-tortilla-vegetable-burrito-fajita-shawarma-with-veget-png-image_15852744.png",
    "Tortillas"
  ),
  new TortillaItem(
    2,
    "Poulet Tikka",
    "Oignons, poivrons, fromage, blanc de poulet mariné, sauce barbecue, avec un boisson 33cl au choix",
    "https://static.vecteezy.com/system/resources/previews/032/325/277/non_2x/taco-mexican-tortilla-wrap-with-chicken-isolated-on-transparent-background-file-cut-out-ai-generated-png.png",
    "Tortillas"
  )
];
