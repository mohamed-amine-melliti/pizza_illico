export class DessertCombo {
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
  
  export const dessertCombos: DessertCombo[] = [
    new DessertCombo(1, "Glaces Haagen-Dazs", "Desserts Glaces", "https://limonest.sushi-k.fr/wp-content/uploads/2024/09/Haagen-vanille.png"),
    new DessertCombo(2, "Pâtisserie Brownies", "Desserts Pâtisserie", "https://png.pngtree.com/png-clipart/20231016/original/pngtree-chocolate-brownie-png-png-image_13321549.png"),
    new DessertCombo(3, "Pâtisserie Muffin", "Desserts Pâtisserie", "https://img.freepik.com/photos-gratuite/gateaux_74190-18.jpg?semt=ais_hybrid&w=740"),
    new DessertCombo(4, "Pâtisserie Tarte au daims", "Desserts Pâtisserie", "https://halalfs.com/1058-large_default/almondy-daim.jpg"),
    new DessertCombo(5, "Pâtisserie Tiramisu", "Desserts Pâtisserie", "https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-tiramisu-cake-isolated-png-image_9242463.png"),
  ];
  