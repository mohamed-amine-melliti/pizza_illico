export class Paninis {
  name: string;
  description: string;
  image: string;
  drinkIncluded: boolean;
  category: string;

  constructor(
    name: string,
    description: string,
    image: string,
    drinkIncluded: boolean = true,
    category: string = "Paninis"
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.drinkIncluded = drinkIncluded;
    this.category = category;
  }
}

export const PaninisSelection: Paninis[] = [
  new Paninis("Toscano", "4 fromages, avec un boisson 33cl au choix", "https://loiseau-lyre.be/217-large_default/panini-toscan.jpg"),
  new Paninis("Napoli", "Mozzarella, tomates, jambon, avec un boisson 33cl au choix", "https://i.pinimg.com/474x/29/66/10/2966104f1c3985cb36886729225c75a9.jpg"),
  new Paninis("Rimini", "Thon, tomate, mozzarella, avec un boisson 33cl au choix", "https://allopizzapluslonguenesse.fr/wp-content/uploads/2021/05/thon.png"),
  new Paninis("Venezia", "Tomate, mozzarella, poulet, avec un boisson 33cl au choix", "https://pizzatimedkr.com/wp-content/uploads/2023/09/le-venezia.png"),
  new Paninis("Saumon", "Tomate, mozzarella, saumon, avec un boisson 33cl au choix", "https://popolipizza54.fr/wp-content/uploads/2021/03/saumon-1.png"),
  new Paninis("Americain", "Tomate, chèvre, viande hachée, avec un boisson 33cl au choix", "https://static.mavillemonshopping.fr/uploads/production/image/file/f48ac30b206f645c61f99ac9da0c3b34.png"),
  new Paninis("Roma", "Mozzarella, tomate, jambon, champignons, avec un boisson 33cl au choix", "https://images.squarespace-cdn.com/content/v1/63eaa03585d3c60f9f0af12b/1679533360460-VEOE3ILD4CUW0CU3CBQA/Lunch+Hanover+Deli+%2827%29.png")
];
