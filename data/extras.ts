export class ExtraItem {
    id: number;
    name: string;
    category: string;
    image: string;
  
    constructor(id: number, name: string, category: string, image: string) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.image = image;
    }
  }
  
  export const extraItems: ExtraItem[] = [
    new ExtraItem(1, "Frites", "Accompagnements", "https://img.freepik.com/photos-premium/frites-dans-emballage-papier-fond-blanc_943860-5736.jpg?semt=ais_hybrid&w=740"),
    new ExtraItem(2, "Cheesy Frites", "Accompagnements", "https://static.vecteezy.com/system/resources/previews/049/575/358/non_2x/cheesy-beef-fries-free-png.png"),
    new ExtraItem(3, "Nuggets (6 pièces)", "Snacks", "https://static.vecteezy.com/system/resources/previews/036/498/581/non_2x/ai-generated-chicken-nuggets-with-a-transparent-background-png.png"),
    new ExtraItem(4, "Onion Rings", "Snacks", "https://png.pngtree.com/png-clipart/20210311/original/pngtree-food-fried-onion-rings-png-image_5989928.jpg"),
    new ExtraItem(5, "Sauce BBQ", "Sauces", "https://media.istockphoto.com/id/1426668957/fr/photo/bol-de-sauce-barbecue-isol%C3%A9-sur-blanc.jpg?s=612x612&w=0&k=20&c=vcIkaauMN1rGudWuPJdUSf0rWc033jCr33PyXmx1bgE="),
    new ExtraItem(6, "Sauce Ketcheup", "Sauces", "https://pngimg.com/d/ketchup_PNG37.png"),
  ];
  