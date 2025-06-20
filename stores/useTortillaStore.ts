import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { MenuItem } from "@/entities/MenuItem";
import { MenuCategory } from "@/entities/MenuCategory";

export const useTortillaStore = defineStore("tortilla", () => {
  // Define categories
  const tortillaCategory = new MenuCategory(
    2, "Nos Tortillas", "Delicious tortilla wraps",
    "https://png.pngtree.com/png-vector/20240807/ourmid/pngtree-tortilla-wrap-concepts-png-image_13115427.png"
  );

  const pizzaCategory = new MenuCategory(
    1, "Nos Pizzas", "Delicious Pizzas",
    "https://t3.ftcdn.net/jpg/07/70/75/16/360_F_770751689_FZdxDkfXHjeKTK4C49yapEIkiuafVJEY.jpg"
  );

  const paninisCategory = new MenuCategory( 
    3, "Nos Paninis", "Delicious panini wraps",
    "https://static.vecteezy.com/system/resources/thumbnails/046/437/705/small_2x/sandwich-transparent-background-png.png"
  );

  const texMexCategory = new MenuCategory(
    4, "Nos Tex Mex", "Delicious Tex-Mex wraps",
    "https://png.pngtree.com/png-vector/20240807/ourmid/pngtree-tortilla-wrap-concepts-png-image_13115427.png"
  );

  // Define all menu items dynamically
  const menuItems = ref<MenuItem[]>([
    new MenuItem(
      1, "Viande Hachée",
      "Oignons, poivrons, fromage, avec une boisson 33cl au choix",
      9.99, tortillaCategory
    ),
    new MenuItem(
      2, "Poulet Tikka",
      "Oignons, poivrons, fromage, blanc de poulet mariné, sauce barbecue, avec une boisson 33cl au choix",
      10.99, tortillaCategory
    ),
    new MenuItem(
      3, "Margherita",
      "Tomate, mozzarella, basilic frais",
      8.99, pizzaCategory
    ),
  ]);

  // Function to update the menu dynamically
  const setMenuItems = (newItems: MenuItem[]) => {
    if (Array.isArray(newItems)) {
      menuItems.value = newItems;
    } else {
      console.error("setMenuItems() expects an array, received:", newItems);
    }
  };

  // Computed property to filter items by category
  const getItemsByCategory = computed(() => (selectedCategory: MenuCategory) => {
    if (!selectedCategory) return [];
    console.log("hné",selectedCategory)
    return menuItems.value.filter(item => item.category.id === selectedCategory.id);
  });

  return { 
    menuItems, 
    setMenuItems, 
    getItemsByCategory,
    tortillaCategory,
    pizzaCategory,
    paninisCategory,
    texMexCategory
  };
});
